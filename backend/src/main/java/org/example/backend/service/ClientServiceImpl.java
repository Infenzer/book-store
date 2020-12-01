package org.example.backend.service;

import org.example.backend.model.Client;
import org.example.backend.model.Role;
import org.example.backend.repository.ClientRepository;
import org.example.backend.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    final ClientRepository clientRepository;
    final RoleRepository roleRepository;
    final PasswordEncoder passwordEncoder;

    public ClientServiceImpl(ClientRepository clientRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void save(Client client) {
        List<Role> roles = new ArrayList<>();
        Optional<Role> role = roleRepository.findById(1L);

        role.ifPresent(roles::add);
        client.setRoles(roles);

        client.setPassword(passwordEncoder.encode(client.getPassword()));
        clientRepository.save(client);
    }

    @Override
    public boolean delete(Long id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Client> readAll() {
        return clientRepository.findAll();
    }

    @Override
    public boolean findByLoginAndPassword(String login, String password) {
        Optional<Client> client = clientRepository.findByLogin(login);

        if (client.isPresent()) {
            String clientPassword = client.get().getPassword();
            return passwordEncoder.matches(password, clientPassword);
        }

        return false;
    }
}
