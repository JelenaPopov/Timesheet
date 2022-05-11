package com.timesheet.Timesheet.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Where(clause= "deleted = 'false'")
@Getter
@Setter
@NoArgsConstructor
public class Client extends AbstractModel{

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String country;

    private String city;

    private String street;

    private String postalCode;

}
