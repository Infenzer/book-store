package org.example.backend.service;

import org.example.backend.model.Client;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    public void save(Client client);
    public boolean delete(Long id);
    public List<Client> readAll();
    public boolean findByLoginAndPassword(String login, String password);
}
