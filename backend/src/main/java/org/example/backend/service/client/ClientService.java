package org.example.backend.service.client;

import org.example.backend.model.client.Client;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    void save(Client client);
    boolean delete(Long id);
    List<Client> readAll();
    Optional<Client> findByLoginAndPassword(String login, String password);
    Optional<Client> findByLogin(String login);
}
