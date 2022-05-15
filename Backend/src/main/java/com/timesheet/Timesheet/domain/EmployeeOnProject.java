package com.timesheet.Timesheet.domain;

import com.timesheet.Timesheet.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class EmployeeOnProject {

    @EmbeddedId
    private EmployeeProjectId id;

    @ManyToOne
    @MapsId("projectId")
    private Project project;

    @ManyToOne
    @MapsId("employeeId")
    private User employee;

    private LocalDate startDate;

    private LocalDate endDate;

    public EmployeeOnProject() {
        this.id = new EmployeeProjectId();
    }
}
