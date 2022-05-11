package com.timesheet.Timesheet.domain.user;

import com.timesheet.Timesheet.domain.AbstractModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Where(clause= "deleted = 'false'")
@Getter
@Setter
@NoArgsConstructor
public class User extends AbstractModel {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;

    private double weeklyWorkingHours;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    private Set<UserRole> userRoles = new HashSet<>();
}
