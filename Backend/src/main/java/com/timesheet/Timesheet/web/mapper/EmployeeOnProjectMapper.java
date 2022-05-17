package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.EmployeeOnProject;
import com.timesheet.Timesheet.domain.EmployeeProjectId;
import com.timesheet.Timesheet.service.EmployeeOnProjectService;
import com.timesheet.Timesheet.web.dto.EmployeeOnProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class EmployeeOnProjectMapper {

    private EmployeeOnProjectService employeeOnProjectService;

    private final UserMapper userMapper;

    @Autowired
    public EmployeeOnProjectMapper(UserMapper userMapper,  EmployeeOnProjectService employeeOnProjectService) {
        this.userMapper = userMapper;
        this.employeeOnProjectService = employeeOnProjectService;
    }

    public EmployeeOnProject toEntity(EmployeeOnProjectDTO dto, Long projectId){
        if(dto == null){
            return null;
        }

        Optional<EmployeeOnProject> employee = employeeOnProjectService.findById(new EmployeeProjectId(dto.getEmployee().getId(),projectId));
        EmployeeOnProject model = employee.orElseGet(EmployeeOnProject::new);

        model.setEmployee(userMapper.toEntity(dto.getEmployee()));
        model.setStartDate(getLocalDateTime(dto.getStartDate()));
        model.setEndDate(getLocalDateTime(dto.getEndDate()));

        return model;
    }

    public EmployeeOnProjectDTO toDto(EmployeeOnProject model){
        EmployeeOnProjectDTO dto = new EmployeeOnProjectDTO();

        dto.setId(model.getId().toString());
        dto.setEmployee(userMapper.toDto(model.getEmployee()));
        dto.setStartDate(model.getStartDate().toString());
        dto.setEndDate(model.getEndDate().toString());
        return dto;
    }

    public List<EmployeeOnProjectDTO> toDto(Collection<EmployeeOnProject> models) {
        return models.stream().map(this::toDto).collect(Collectors.toList());
    }

    private LocalDate getLocalDateTime(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }
}
