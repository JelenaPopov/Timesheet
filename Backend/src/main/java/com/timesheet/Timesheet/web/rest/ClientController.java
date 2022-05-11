package com.timesheet.Timesheet.web.rest;

import com.timesheet.Timesheet.domain.Client;
import com.timesheet.Timesheet.service.ClientService;
import com.timesheet.Timesheet.web.dto.ClientDTO;
import com.timesheet.Timesheet.web.mapper.ClientMapper;
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
@RequestMapping(value = "/api/clients")
@PreAuthorize("hasAnyRole('ADMIN')")
public class ClientController {

    private final ClientService service;

    private final ClientMapper mapper;

    @Autowired
    public ClientController(ClientService service, ClientMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> findAll(@RequestParam(defaultValue = "0") Integer pageNo,
                                                   @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<Client> clients = service.findAll(pageNo, pageSize);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Total-Pages", Integer.toString(clients.getTotalPages()));

        return new ResponseEntity<>(mapper.toDto(clients.getContent()),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> findOne(@PathVariable long id) {
        return new ResponseEntity<>(mapper.toDto(service.findById(id)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ClientDTO> save(@RequestBody @Validated ClientDTO dto) {
        return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto))), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> update(@PathVariable long id, @RequestBody  ClientDTO dto) {
        dto.setId(id);
        return new ResponseEntity<>(mapper.toDto(service.save(mapper.toEntity(dto))), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable Long id) throws IllegalArgumentException {
        service.delete(service.findById(id));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
