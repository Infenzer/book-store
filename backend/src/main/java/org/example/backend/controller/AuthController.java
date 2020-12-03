package org.example.backend.controller;

import org.example.backend.dto.AuthMessage;
import org.example.backend.dto.ClientDto;
import org.example.backend.dto.ResMessage;
import org.example.backend.mapper.ClientMapper;
import org.example.backend.model.Client;
import org.example.backend.security.jwt.JwtProvider;
import org.example.backend.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    final ClientService clientService;
    final ClientMapper clientMapper;
    final JwtProvider jwtProvider;

    public AuthController(ClientService clientService, ClientMapper clientMapper, JwtProvider jwtProvider) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    private ResponseEntity<AuthMessage> login(@RequestBody @Valid ClientDto clientDto) {
        Optional<Client> clientOptional = clientService.findByLoginAndPassword(clientDto.getLogin(), clientDto.getPassword());

        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            String token = jwtProvider.generateToken(clientDto.getLogin());
            AuthMessage message = AuthMessage
                    .builder()
                    .id(client.getId().toString())
                    .username(client.getLogin())
                    .jwtToken(token)
                    .build();
            return new ResponseEntity<>(message, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register")
    private ResponseEntity<ResMessage> register(@RequestBody @Valid ClientDto clientDto) {
        clientService.save(clientMapper.toEntity(clientDto));
        return new ResponseEntity<>(new ResMessage("User created"), HttpStatus.CREATED);
    }
}
