package com.timesheet.Timesheet.service;

import com.timesheet.Timesheet.domain.Client;
import com.timesheet.Timesheet.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ClientService implements GenericService<Client,Long> {

    private final ClientRepository repository;

    @Autowired
    public ClientService(ClientRepository repository) {
        this.repository = repository;
    }

    @Override
    public Client save(Client client) {
        return repository.save(client);
    }

    @Override
    public Client findById(Long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<Client> findAll(Integer pageNo, Integer pageSize) {
        return repository.findAll(PageRequest.of(pageNo, pageSize));
    }

    @Override
    public void delete(Client client) {
        client.setDeleted(true);
        repository.save(client);
    }

    public List<Client> findAll(){
        return repository.findAll();
    }
}
