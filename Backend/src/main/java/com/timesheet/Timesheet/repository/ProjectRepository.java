package com.timesheet.Timesheet.repository;

import com.timesheet.Timesheet.domain.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

    @Query("select project " +
            "from Project project " +
            "left join fetch project.client client " +
            "left join fetch project.teamLead teamLead " +
            "where project.id = :id")
    Optional<Project> findById(@Param("id") Long id);

    @Query(value = "select project " +
            "from Project project " +
            "left join fetch project.client client " +
            "left join fetch project.teamLead teamLead ",
            countQuery = "select count(project) " +
                    "from Project project " +
                    "left join project.client client " +
                    "left join project.teamLead teamLead ")
    Page<Project> findAll(Pageable pageable);

    @Query("select distinct project " +
            "from Project project " +
            "left join fetch project.client client " +
            "where client.id = :clientId")
    List<Project> findClientProjects(@Param("clientId") Long clientId);

    @Query("select distinct project " +
            "from Project project " +
            "left join fetch project.teamLead teamLead " +
            "left join fetch project.employeeOnProjects employeeOnProjects " +
            "left join fetch employeeOnProjects.employee employee " +
            "where (employee.id = :userId and (employeeOnProjects.endDate is null or employeeOnProjects.endDate >= :date)  and (employeeOnProjects.startDate <= :date)) " +
            "or (teamLead.id = :userId)")
    List<Project> findAllLoggedInUserProjects(@Param("userId") Long userId, @Param("date") LocalDate date);
}