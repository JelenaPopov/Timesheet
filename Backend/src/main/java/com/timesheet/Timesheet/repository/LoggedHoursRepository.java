package com.timesheet.Timesheet.repository;

import com.timesheet.Timesheet.domain.LoggedHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggedHoursRepository extends JpaRepository<LoggedHours,Long> {
}
