package com.timesheet.Timesheet.domain;

import com.timesheet.Timesheet.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import java.util.Set;

@Entity
@Where(clause= "deleted = 'false'")
@Getter
@Setter
@NoArgsConstructor
public class Project extends AbstractModel{

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Client client;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private User teamLead;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<EmployeeOnProject> employeeOnProjects;
}
