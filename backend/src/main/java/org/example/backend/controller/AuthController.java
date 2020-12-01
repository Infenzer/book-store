package org.example.backend.controller;

import org.example.backend.dto.ClientDto;
import org.example.backend.dto.ResMessage;
import org.example.backend.mapper.ClientMapper;
import org.example.backend.security.jwt.JwtProvider;
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
    final JwtProvider jwtProvider;

    public AuthController(ClientService clientService, ClientMapper clientMapper, JwtProvider jwtProvider) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    private ResponseEntity<ResMessage> login(@RequestBody @Valid ClientDto clientDto) {
        if (clientService.findByLoginAndPassword(clientDto.getLogin(), clientDto.getPassword())) {
            String token = jwtProvider.generateToken(clientDto.getLogin());
            return new ResponseEntity<>(new ResMessage(token), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResMessage("Ошибка авторизации"), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register")
    private ResponseEntity<ResMessage> register(@RequestBody @Valid ClientDto clientDto) {
        clientService.save(clientMapper.toEntity(clientDto));
        return new ResponseEntity<>(new ResMessage("User created"), HttpStatus.CREATED);
    }
}
