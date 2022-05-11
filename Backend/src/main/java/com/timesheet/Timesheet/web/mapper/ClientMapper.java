package com.timesheet.Timesheet.web.mapper;

import com.timesheet.Timesheet.domain.Client;
import com.timesheet.Timesheet.service.ClientService;
import com.timesheet.Timesheet.web.dto.ClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClientMapper extends DefaultMapper<ClientDTO, Client> {

    private final ClientService service;

    @Autowired
    public ClientMapper(ClientService service) {
        this.service = service;
    }

    public Client toEntity(ClientDTO dto){
        if(dto == null){
            return null;
        }

        Client model;
        if(dto.getId()!=null){
            model = service.findById(dto.getId());
        }
        else{
            model = new Client();
        }

        model.setFirstName(dto.getFirstName());
        model.setLastName(dto.getLastName());
        model.setCountry(dto.getCountry());
        model.setCity(dto.getCity());
        model.setStreet(dto.getStreet());
        model.setPostalCode(dto.getPostalCode());

        super.toEntity(dto,model);
        return model;
    }

    public ClientDTO toDto(Client model){
        ClientDTO dto = new ClientDTO();
        dto.setFirstName(model.getFirstName());
        dto.setLastName(model.getLastName());
        dto.setCountry(model.getCountry());
        dto.setCity(model.getCity());
        dto.setStreet(model.getStreet());
        dto.setPostalCode(model.getPostalCode());

        super.toDTO(model,dto);
        return dto;
    }

    public List<ClientDTO> toDto(Collection<Client> models) {
        return models.stream().map(this::toDto).collect(Collectors.toList());
    }
}
