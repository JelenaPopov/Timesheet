package com.timesheet.Timesheet.service;

import com.timesheet.Timesheet.domain.Category;
import com.timesheet.Timesheet.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class CategoryService implements GenericService<Category,Long> {

    private final CategoryRepository repository;

    @Autowired
    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Category save(Category category) {
        return repository.save(category);
    }

    @Override
    public Category findById(Long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<Category> findAll(Integer pageNo, Integer pageSize) {
        return repository.findAll(PageRequest.of(pageNo, pageSize));
    }

    @Override
    public void delete(Category category) {
        category.setDeleted(true);
        repository.save(category);
    }

    public List<Category> findAll(){
        return repository.findAll();
    }
}
