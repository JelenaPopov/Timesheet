package com.timesheet.Timesheet.repository;

import com.timesheet.Timesheet.domain.EmployeeOnProject;
import com.timesheet.Timesheet.domain.EmployeeProjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeOnProjectRepository extends JpaRepository<EmployeeOnProject, EmployeeProjectId> {

    @Query("select distinct employeeOnProject " +
            "from EmployeeOnProject employeeOnProject " +
            "left join fetch employeeOnProject.project project " +
            "where project.id = :projectId order by employeeOnProject.startDate")
    List<EmployeeOnProject> getEmployeesOnProject(@Param("projectId") Long projectId);

    @Query(value = "select distinct employeeOnProject " +
            "from EmployeeOnProject employeeOnProject " +
            "left join employeeOnProject.project project " +
            "where project.id = :projectId order by employeeOnProject.startDate",
            countQuery = "select distinct count(employeeOnProject) " +
                    "from EmployeeOnProject employeeOnProject " +
                    "left join employeeOnProject.project project " +
                    "where project.id = :projectId")
    Page<EmployeeOnProject> getEmployeesOnProject(Pageable pageable, @Param("projectId") Long projectId);
}
