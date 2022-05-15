package com.timesheet.Timesheet.service;

import com.timesheet.Timesheet.domain.EmployeeOnProject;
import com.timesheet.Timesheet.domain.EmployeeProjectId;
import com.timesheet.Timesheet.repository.EmployeeOnProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeOnProjectService {

    private final EmployeeOnProjectRepository repository;

    @Autowired
    public EmployeeOnProjectService(EmployeeOnProjectRepository repository) {
        this.repository = repository;
    }

    public Optional<EmployeeOnProject> findById(EmployeeProjectId id) {
        return repository.findById(id);
    }

    public List<EmployeeOnProject> getEmployeesOnProject(Long projectId){
        return repository.getEmployeesOnProject(projectId);
    }
}
