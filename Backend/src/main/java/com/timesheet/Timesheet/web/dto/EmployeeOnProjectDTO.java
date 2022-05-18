package com.timesheet.Timesheet.web.dto;

import com.timesheet.Timesheet.web.dto.user.UserDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeOnProjectDTO {

    private String id;

    @NotNull
    private UserDTO employee;

    @NotBlank
    private String startDate;

    private String endDate;
}
