package com.timesheet.Timesheet.domain.user;

import com.timesheet.Timesheet.domain.AbstractModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Where(clause= "deleted = 'false'")
@Getter
@Setter
@NoArgsConstructor
public class Role extends AbstractModel {

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "role")
    private Set<UserRole> userRoles = new HashSet<>();
}
