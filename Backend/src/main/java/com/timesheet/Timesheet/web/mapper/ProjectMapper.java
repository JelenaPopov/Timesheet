package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.Project;
import com.timesheet.Timesheet.service.ProjectService;
import com.timesheet.Timesheet.web.dto.ProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectMapper extends DefaultMapper<ProjectDTO, Project> {

    private final ProjectService service;

    private final ClientMapper clientMapper;

    private final UserMapper userMapper;

    @Autowired
    public ProjectMapper(ProjectService service, ClientMapper clientMapper, UserMapper userMapper) {
        this.service = service;
        this.clientMapper = clientMapper;
        this.userMapper = userMapper;
    }

    public Project toEntity(ProjectDTO dto){
        if(dto == null){
            return null;
        }

        Project model;
        if(dto.getId()!=null){
            model = service.findById(dto.getId());
        }
        else{
            model = new Project();
        }

        model.setName(dto.getName());
        model.setDescription(dto.getDescription());
        if(dto.getClient() != null){
            model.setClient(clientMapper.toEntity(dto.getClient()));
        }
        if(dto.getTeamLead() != null){
            model.setTeamLead(userMapper.toEntity(dto.getTeamLead()));
        }

        super.toEntity(dto,model);
        return model;
    }

    public ProjectDTO toDto(Project model){
        ProjectDTO dto = new ProjectDTO();
        dto.setName(model.getName());
        dto.setDescription(model.getDescription());
        if(model.getClient() != null){
            dto.setClient(clientMapper.toDto(model.getClient()));
        }
        if(model.getTeamLead() != null){
            dto.setTeamLead(userMapper.toDto(model.getTeamLead()));
        }

        super.toDTO(model,dto);
        return dto;
    }

    public List<ProjectDTO> toDto(Collection<Project> models) {
        return models.stream().map(this::toDto).collect(Collectors.toList());
    }
}
