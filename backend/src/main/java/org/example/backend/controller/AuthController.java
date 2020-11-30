package org.example.backend.controller;

import org.example.backend.dto.ClientDto;
import org.example.backend.dto.ResMessage;
import org.example.backend.mapper.ClientMapper;
import org.example.backend.model.Client;
import org.example.backend.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    final ClientService clientService;
    final ClientMapper clientMapper;

    public AuthController(ClientService clientService, ClientMapper clientMapper) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
    }

    @PostMapping("/login")
    private ResponseEntity<ClientDto> login(@RequestBody @Valid ClientDto clientDto) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    private ResponseEntity<ResMessage> register(@RequestBody @Valid ClientDto clientDto) {
        clientService.create(clientMapper.toEntity(clientDto));
        return new ResponseEntity<>(new ResMessage("User created"), HttpStatus.CREATED);
    }
}
