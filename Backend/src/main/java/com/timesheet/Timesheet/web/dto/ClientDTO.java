package com.timesheet.Timesheet.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class ClientDTO extends AbstractDTO {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String country;

    private String city;

    private String street;

    private String postalCode;
}
