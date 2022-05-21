package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.LoggedHours;
import com.timesheet.Timesheet.domain.user.User;
import com.timesheet.Timesheet.service.LoggedHoursService;
import com.timesheet.Timesheet.web.dto.LoggedHoursDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LoggedHoursMapper  extends DefaultMapper<LoggedHoursDTO, LoggedHours>{

    private final LoggedHoursService service;

    private final CategoryMapper categoryMapper;

    private final ProjectMapper projectMapper;

    @Autowired
    public LoggedHoursMapper(LoggedHoursService service, CategoryMapper categoryMapper, ProjectMapper projectMapper) {
        this.service = service;
        this.categoryMapper = categoryMapper;
        this.projectMapper = projectMapper;
    }

    public LoggedHours toEntity(LoggedHoursDTO dto, User user){
        if(dto == null){
            return null;
        }

        LoggedHours model;
        if(dto.getId()!=null){
            model = service.findById(dto.getId());
        }
        else{
            model = new LoggedHours();
        }
        model.setUser(user);
        if(dto.getProject() != null){
            model.setProject(projectMapper.toMinimalEntity(dto.getProject()));
        }
        if(dto.getCategory() != null){
            model.setCategory(categoryMapper.toEntity(dto.getCategory()));
        }
        model.setDescription(dto.getDescription());
        model.setHours(dto.getHours());
        model.setCreated(getLocalDate(dto.getCreated()));
        super.toEntity(dto,model);
        return model;
    }

    public LoggedHoursDTO toDto(LoggedHours model){
        LoggedHoursDTO dto = toMinimalDto(model);

        if(model.getProject() != null){
            dto.setProject(projectMapper.toMinimalDto(model.getProject()));
        }

        if(model.getCategory() != null){
            dto.setCategory(categoryMapper.toDto(model.getCategory()));
        }

        dto.setDescription(model.getDescription());
        return dto;
    }

    public LoggedHoursDTO toMinimalDto(LoggedHours model){
        LoggedHoursDTO dto = new LoggedHoursDTO();
        dto.setHours(model.getHours());
        dto.setCreated(model.getCreated().toString());
        super.toDTO(model,dto);
        return dto;
    }

    public List<LoggedHoursDTO> toDto(Collection<LoggedHours> models) {
        return models.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<LoggedHoursDTO> toMinimalDto(Collection<LoggedHours> models) {
        return models.stream().map(this::toMinimalDto).collect(Collectors.toList());
    }

    private LocalDate getLocalDate(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }
}
