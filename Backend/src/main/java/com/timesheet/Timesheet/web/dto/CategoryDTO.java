package com.timesheet.Timesheet.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDTO extends AbstractDTO{

    @NotBlank
    private String name;

}
