package com.timesheet.Timesheet.web.rest;

import com.timesheet.Timesheet.domain.LoggedHours;
import com.timesheet.Timesheet.domain.user.User;
import com.timesheet.Timesheet.service.LoggedHoursService;
import com.timesheet.Timesheet.service.user.UserService;
import com.timesheet.Timesheet.web.dto.CategoryDTO;
import com.timesheet.Timesheet.web.dto.LoggedHoursDTO;
import com.timesheet.Timesheet.web.dto.ProjectDTO;
import com.timesheet.Timesheet.web.mapper.LoggedHoursMapper;
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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/logged-hours")
@PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
public class LoggedHoursController {

    private final LoggedHoursService service;

    private final LoggedHoursMapper mapper;

    private final UserService userService;

    @Autowired
    public LoggedHoursController(LoggedHoursService service, LoggedHoursMapper mapper, UserService userService) {
        this.service = service;
        this.mapper = mapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<LoggedHoursDTO>> findAllUserLogs(@RequestParam(defaultValue = "0") Integer pageNo,
                                                        @RequestParam(defaultValue = "10") Integer pageSize,
                                                        @RequestParam String created) {
        Page<LoggedHours> loggedHours = service.findAllUserLogs(pageNo, pageSize, getLocalDate(created), userService.getLoggedInUser().getId());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Pages", Integer.toString(loggedHours.getTotalPages()));

        return new ResponseEntity<>(mapper.toDto(loggedHours.getContent()), headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoggedHoursDTO> findOne(@PathVariable long id) {
        return new ResponseEntity<>(mapper.toDto(service.findById(id)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LoggedHoursDTO> save(@RequestBody @Validated LoggedHoursDTO dto) {
        return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto, userService.getLoggedInUser()))), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoggedHoursDTO> update(@PathVariable long id, @RequestBody  LoggedHoursDTO dto) {
        dto.setId(id);
        return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto, userService.getLoggedInUser()))), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable Long id) throws IllegalArgumentException {
        service.delete(service.findById(id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private LocalDate getLocalDate(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }
}
