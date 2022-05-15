package com.timesheet.Timesheet.web.rest;

import com.timesheet.Timesheet.domain.Project;
import com.timesheet.Timesheet.exception.RestrictRemoveException;
import com.timesheet.Timesheet.service.EmployeeOnProjectService;
import com.timesheet.Timesheet.service.ProjectService;
import com.timesheet.Timesheet.service.user.UserService;
import com.timesheet.Timesheet.web.dto.EmployeeOnProjectDTO;
import com.timesheet.Timesheet.web.dto.ProjectDTO;
import com.timesheet.Timesheet.web.mapper.EmployeeOnProjectMapper;
import com.timesheet.Timesheet.web.mapper.ProjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/projects")
@PreAuthorize("hasAnyRole('ADMIN')")
public class ProjectController {

    private final ProjectService service;

    private final ProjectMapper mapper;

    private final EmployeeOnProjectMapper employeeOnProjectMapper;

    private final EmployeeOnProjectService employeeOnProjectService;

    @Autowired
    public ProjectController(ProjectService service, ProjectMapper mapper, EmployeeOnProjectMapper employeeOnProjectMapper, EmployeeOnProjectService employeeOnProjectService) {
        this.service = service;
        this.mapper = mapper;
        this.employeeOnProjectMapper = employeeOnProjectMapper;
        this.employeeOnProjectService = employeeOnProjectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> findAll(@RequestParam(defaultValue = "0") Integer pageNo,
                                                    @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<Project> projects = service.findAll(pageNo, pageSize);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Pages", Integer.toString(projects.getTotalPages()));

        return new ResponseEntity<>(mapper.toDto(projects.getContent()), headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> findOne(@PathVariable long id) {
        return new ResponseEntity<>(mapper.toDto(service.findById(id)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> save(@RequestBody @Validated ProjectDTO dto) {
        return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto))), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> update(@PathVariable long id, @RequestBody  ProjectDTO dto) {
        dto.setId(id);
        return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto))), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable Long id) throws IllegalArgumentException, RestrictRemoveException {
        if(!employeeOnProjectService.getEmployeesOnProject(id).isEmpty()){
            throw new RestrictRemoveException("Delete forbidden!");
        }

        service.delete(service.findById(id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/employees")
    public ResponseEntity<ProjectDTO> addEmployeeOnProject(@PathVariable Long id, @RequestBody @Validated EmployeeOnProjectDTO employeeOnProject) {
        Project project = service.findById(id);

        return new ResponseEntity<>(mapper.toDto(service.addEmployeeOnProject(project, employeeOnProjectMapper.toEntity(employeeOnProject, project.getId()))), HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}/employees")
    public ResponseEntity<List<EmployeeOnProjectDTO>> getEmployeesOnProject(@PathVariable Long projectId) {
        return new ResponseEntity<>(employeeOnProjectMapper.toDto(employeeOnProjectService.getEmployeesOnProject(projectId)), HttpStatus.OK);
    }

}
