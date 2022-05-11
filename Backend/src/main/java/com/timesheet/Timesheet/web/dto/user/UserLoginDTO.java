package com.timesheet.Timesheet.web.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginDTO {

    @NotBlank
    public String username;

    @NotBlank
    public String password;

}
