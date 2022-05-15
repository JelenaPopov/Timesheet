package com.timesheet.Timesheet.web.dto;

import com.timesheet.Timesheet.web.dto.user.UserDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class ProjectDTO extends AbstractDTO {

    @NotBlank
    private String name;

    private String description;

    private ClientDTO client;

    private UserDTO teamLead;
}
