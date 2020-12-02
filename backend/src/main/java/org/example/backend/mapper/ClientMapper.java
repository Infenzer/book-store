package org.example.backend.mapper;

import org.example.backend.dto.ClientDto;
import org.example.backend.model.Client;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {
    final ModelMapper modelMapper;

    public ClientMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ClientDto toDto(Client client) {
        return modelMapper.map(client, ClientDto.class);
    }

    public Client toEntity(ClientDto clientDto) {
        return modelMapper.map(clientDto, Client.class);
    }
}
