package org.example.backend.service;

import org.example.backend.model.Client;

import java.util.List;

public interface ClientService {
    public Client create(Client client);
    public boolean delete(Long id);
    public List<Client> readAll();
}
