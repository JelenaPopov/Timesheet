package com.timesheet.Timesheet.service;

import org.springframework.data.domain.Page;

import java.io.Serializable;

public interface GenericService<T, ID extends Serializable> {

    T save(T t);

    T findById(ID id);

    Page<T> findAll(Integer pageNo, Integer pageSize);

    void delete(T t);

}
