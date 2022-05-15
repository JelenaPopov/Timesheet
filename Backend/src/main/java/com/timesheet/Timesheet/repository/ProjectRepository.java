package com.timesheet.Timesheet.repository;

import com.timesheet.Timesheet.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

    @Query("select distinct project " +
            "from Project project " +
            "left join fetch project.client client " +
            "where client.id = :clientId and project.deleted = false")
    List<Project> findClientProjects(@Param("clientId") Long clientId);
}