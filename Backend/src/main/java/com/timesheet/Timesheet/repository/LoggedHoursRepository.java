package com.timesheet.Timesheet.repository;

import com.timesheet.Timesheet.domain.LoggedHours;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface LoggedHoursRepository extends JpaRepository<LoggedHours,Long> {

    @Query(value = "select loggedHours " +
            "from LoggedHours loggedHours " +
            "left join fetch loggedHours.project project " +
            "left join fetch loggedHours.user user " +
            "left join fetch loggedHours.category category " +
            "where user.id = :userId and loggedHours.created = :created",
            countQuery = "select count(loggedHours) " +
                    "from LoggedHours loggedHours " +
                    "left join loggedHours.project project " +
                    "left join loggedHours.user user " +
                    "left join loggedHours.category category " +
                    "where user.id = :userId and loggedHours.created = :created")
    Page<LoggedHours> findAllUserLogs(Pageable pageable,@Param("created") LocalDate created, @Param("userId") Long userId);

}
