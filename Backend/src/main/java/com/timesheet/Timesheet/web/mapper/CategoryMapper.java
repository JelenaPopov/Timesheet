package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.Category;
import com.timesheet.Timesheet.service.CategoryService;
import com.timesheet.Timesheet.web.dto.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper extends DefaultMapper<CategoryDTO, Category> {

    private final CategoryService service;

    @Autowired
    public CategoryMapper(CategoryService service) {
        this.service = service;
    }

    public Category toEntity(CategoryDTO dto){
        if(dto == null){
            return null;
        }

        Category model;
        if(dto.getId()!=null){
            model = service.findById(dto.getId());
        }
        else{
            model = new Category();
        }

        model.setName(dto.getName());
        super.toEntity(dto,model);
        return model;
    }

    public CategoryDTO toDto(Category model){
        CategoryDTO dto = new CategoryDTO();
        dto.setName(model.getName());
        super.toDTO(model,dto);
        return dto;
    }

    public List<CategoryDTO> toDto(Collection<Category> models) {
        return models.stream().map(this::toDto).collect(Collectors.toList());
    }
}
