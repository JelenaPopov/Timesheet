package com.timesheet.Timesheet.domain;

import com.timesheet.Timesheet.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import java.time.LocalDate;

@Entity
@Where(clause= "deleted = 'false'")
@Getter
@Setter
@NoArgsConstructor
public class LoggedHours extends AbstractModel{

    @ManyToOne
    @PrimaryKeyJoinColumn
    private User user;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Project project;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Category category;

    private String description;

    private Double hours;

    private LocalDate created;
}
