package com.timesheet.Timesheet.service;

import com.timesheet.Timesheet.domain.EmployeeOnProject;
import com.timesheet.Timesheet.domain.EmployeeProjectId;
import com.timesheet.Timesheet.domain.Project;
import com.timesheet.Timesheet.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ProjectService extends AbstractService<Project,Long>{

    private final ProjectRepository repository;

    @Autowired
    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    @Override
    public Project save(Project project) {
        return repository.save(project);
    }

    @Override
    public Project findById(Long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<Project> findAll(Integer pageNo, Integer pageSize) {
        return repository.findAll(PageRequest.of(pageNo, pageSize));
    }

    @Override
    public void delete(Project project) {
        project.setDeleted(true);
        repository.save(project);
    }

    public List<Project> findClientProjects(Long clientId){
        return repository.findClientProjects(clientId);
    }

    public Project addEmployeeOnProject(Project project, EmployeeOnProject employeeOnProject){
        employeeOnProject.setProject(project);
        project.getEmployeeOnProjects().add(employeeOnProject);
        return repository.save(project);
    }
}