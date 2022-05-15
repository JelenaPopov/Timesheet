package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.user.User;
import com.timesheet.Timesheet.service.user.UserService;
import com.timesheet.Timesheet.web.dto.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper extends DefaultMapper<UserDTO, User> {

    private final UserService service;

    @Autowired
    public UserMapper(UserService service) {
        this.service = service;
    }

    public User toEntity(UserDTO dto){
        if(dto == null){
            return null;
        }

        User model;
        if(dto.getId()!=null){
            model = service.findById(dto.getId());
        }
        else{
            model = new User();
        }

        model.setFirstName(dto.getFirstName());
        model.setLastName(dto.getLastName());
        model.setWeeklyWorkingHours(dto.getWeeklyWorkingHours());

        super.toEntity(dto,model);
        return model;
    }

    public UserDTO toDto(User model){
        UserDTO dto = new UserDTO();
        dto.setFirstName(model.getFirstName());
        dto.setLastName(model.getLastName());
        dto.setWeeklyWorkingHours(model.getWeeklyWorkingHours());

        super.toDTO(model,dto);
        return dto;
    }

    public List<UserDTO> toDto(Collection<User> models) {
        return models.stream().map(this::toDto).collect(Collectors.toList());
    }
}

