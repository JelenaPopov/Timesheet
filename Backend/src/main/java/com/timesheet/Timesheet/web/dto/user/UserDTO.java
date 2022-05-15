package com.timesheet.Timesheet.web.dto.user;

import com.timesheet.Timesheet.web.dto.AbstractDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO extends AbstractDTO {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private double weeklyWorkingHours;
}
