package com.timesheet.Timesheet.repository;

import com.timesheet.Timesheet.domain.LoggedHours;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

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
    Page<LoggedHours> findUserLogs(Pageable pageable,@Param("created") LocalDate created, @Param("userId") Long userId);

    @Query("select loggedHours " +
            "from LoggedHours loggedHours " +
            "left join fetch loggedHours.user user " +
            "where user.id = :userId and loggedHours.created >= :startDate and loggedHours.created <= :endDate")
    List<LoggedHours> findAll(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("userId") Long userId);

}
