package com.timesheet.Timesheet.service;


import com.timesheet.Timesheet.exception.RestrictRemoveException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import org.springframework.data.domain.Page;
import java.util.Set;

public abstract class AbstractService<T, ID extends Serializable> {

    public enum DeleteStrategy {CASCADE, RESTRICT}

    private final Class<T> entityType;

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    protected EntityManager em;

    @SuppressWarnings("unchecked")
    protected AbstractService() {
        entityType = (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass()).getActualTypeArguments()[0];
    }

    public void remove(ID id) throws IllegalAccessException, IllegalArgumentException,
            InvocationTargetException, NoSuchMethodException, RestrictRemoveException {
        remove(id, DeleteStrategy.RESTRICT);
    }

    public void remove(T entity) throws IllegalAccessException, IllegalArgumentException,
            InvocationTargetException, NoSuchMethodException, RestrictRemoveException {
        //default delete strategy is RESTRICT
        remove(entity, DeleteStrategy.RESTRICT);
    }

    /**
     * @param entity
     * 		entity to be deleted
     * @param deleteStrategy
     * 		A strategy for related entities
     */
    public void remove(T entity, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException,
            InvocationTargetException, NoSuchMethodException, RestrictRemoveException {

        //if strategy is RESTRICT, forbid deletion if there are any related entities
        if (deleteStrategy == DeleteStrategy.RESTRICT) {
            String field = hasNonEmptyChildren(entity);
            if (field != null)
                throw new RestrictRemoveException(field);
        } else if (deleteStrategy == DeleteStrategy.CASCADE) {
            //if strategy is CASCADE, soft delete children too
            deleteChildrenCascade(entity);
        }
        // Logically deletes entities if 'deleted' field exist
        Method setter = entity.getClass().getMethod("setDeleted", Boolean.class);
        setter.invoke(entity, true);
        em.merge(entity);

    }

    @SuppressWarnings("rawtypes")
    private String hasNonEmptyChildren(Object object) throws NoSuchMethodException, SecurityException,
            IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        if (object != null) {
            Class type = object.getClass();
            do {
                String retVal = hasNonEmptyChildrenSingleType(type, object);
                if (retVal != null) //if this child collection is not empty, stop searching
                    return retVal;

                type = type.getSuperclass();
            } while (type != null && !type.equals(Object.class));
        }
        return null;
    }

    @SuppressWarnings("rawtypes")
    private Boolean deleteChildrenCascade(Object object) throws NoSuchMethodException, SecurityException,
            IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        if (object != null) {
            Class type = object.getClass();
            do {
                Boolean retVal = deleteChildrenCascadeSingleType(type, object);
                if (retVal) //if this child collection is not empty, stop searching
                    return retVal;

                type = type.getSuperclass();
            } while (type != null && !type.equals(Object.class));
        }
        return false;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    private Boolean deleteChildrenCascadeSingleType(Class type, Object object) throws NoSuchMethodException,
            SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        for (Field f : type.getDeclaredFields()) {
            //check are there any non-empty children
            if (f.getType().equals(Set.class) ) {


                Method getter = type.getMethod("get"+ capitalizeFirstLetter(f.getName())); // find get method
                Set childCollection = (Set) getter.invoke(object); //get child collection
                if (childCollection != null) {
                    for (Object child : childCollection) {
                        //soft delete each child
                        Method setter = child.getClass().getMethod("setDeleted", Boolean.class);
                        setter.invoke(child, true);
                        //recursively delete its children
                        deleteChildrenCascade(child);
                    }
                }
            }
        }
        return false;
    }

    /**
     * @param type
     * @param object
     * @return Child field name that is not empty
     * @throws NoSuchMethodException
     * @throws SecurityException
     * @throws IllegalAccessException
     * @throws IllegalArgumentException
     * @throws InvocationTargetException
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    private String hasNonEmptyChildrenSingleType(Class type, Object object) throws NoSuchMethodException,
            SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        for (Field f : type.getDeclaredFields()) {
            //check are there any non-empty children
            if (f.getType().equals(Set.class)) {
                Method getter = type.getMethod("get"
                        + capitalizeFirstLetter(f.getName())); // find get method
                Set fieldInstance = (Set) getter.invoke(object); //get child collection
                if (fieldInstance != null && !isCollectionEmpty(fieldInstance)) //check is it empty
                    return f.getName();
            }
        }
        return null;
    }

    /**
     * Checks are there any non-deleted elements in the collection
     *
     * @param collection
     * @throws SecurityException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    private Boolean isCollectionEmpty(Collection<Object> collection) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        boolean isEmpty = true;
        for (Object element : collection) {
            Method isDeletedMethod = element.getClass().getMethod("getDeleted");
            Boolean deleted = (Boolean) isDeletedMethod.invoke(element);
            if (!deleted) {
                isEmpty = false;
                break;
            }
        }
        return isEmpty;

    }

    /**
     * Converts first letter of the passed string value to UpperCase
     *
     * @param value A string which should be capitalized
     * @return A string value with the capitalized first letter
     */
    private String capitalizeFirstLetter(String value) {
        if (value != null && value.length() > 0)
            return value.substring(0, 1).toUpperCase() + value.substring(1);
        else
            return value;
    }

    private void remove(ID id, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException,
            InvocationTargetException, NoSuchMethodException, RestrictRemoveException {
        T entity;
        entity = em.find(entityType, id);
        remove(entity, deleteStrategy);
    }

    public void removeAll() throws IllegalArgumentException {
        Query q = em.createNativeQuery("DELETE FROM " + entityType.getSimpleName());
        q.executeUpdate();
    }

    public abstract T save(T t);

    public abstract T findById(ID id);

    public abstract Page<T> findAll(Integer pageNo, Integer pageSize);

    public abstract void delete(T t);
}
