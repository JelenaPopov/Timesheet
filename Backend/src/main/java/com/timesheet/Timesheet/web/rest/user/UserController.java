package com.timesheet.Timesheet.web.rest.user;

import com.timesheet.Timesheet.domain.user.User;
import com.timesheet.Timesheet.service.user.UserService;
import com.timesheet.Timesheet.web.dto.user.UserDTO;
import com.timesheet.Timesheet.web.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users")
@PreAuthorize("hasAnyRole('ADMIN')")
public class UserController {

    private final UserService service;

    private final UserMapper mapper;

    @Autowired
    public UserController(UserService service, UserMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll(@RequestParam(defaultValue = "0") Integer pageNo,
                                                 @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<User> users = service.findAll(pageNo, pageSize);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Pages", Integer.toString(users.getTotalPages()));

        return new ResponseEntity<>(mapper.toDto(users.getContent()),headers, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> findAll() {
        return new ResponseEntity<>(mapper.toDto(service.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findOne(@PathVariable long id) {
        return new ResponseEntity<>(mapper.toDto(service.findById(id)), HttpStatus.OK);
    }
}
