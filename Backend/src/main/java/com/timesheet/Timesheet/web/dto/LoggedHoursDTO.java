package com.timesheet.Timesheet.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class LoggedHoursDTO extends AbstractDTO {

    @NotNull
    private ProjectDTO project;

    @NotNull
    private CategoryDTO category;

    private String description;

    @NotNull
    @Positive
    private Double hours;

    private String created;
}
