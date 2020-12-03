package org.example.backend.service;

import org.example.backend.model.Client;
import org.example.backend.model.FavoriteBook;
import org.example.backend.repository.ClientRepository;
import org.example.backend.repository.FavoriteBookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteBookServiceImpl implements FavoriteBookService {

    final FavoriteBookRepository favoriteBookRepository;
    final ClientRepository clientRepository;

    public FavoriteBookServiceImpl(FavoriteBookRepository favoriteBookRepository, ClientRepository clientRepository) {
        this.favoriteBookRepository = favoriteBookRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public boolean save(FavoriteBook book, Long clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);

        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            book.setClient(client);
            favoriteBookRepository.save(book);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(String id) {
        Optional<FavoriteBook> book = favoriteBookRepository.findByBookId(id);
        if (book.isPresent()) {
            favoriteBookRepository.deleteById(book.get().getId());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<FavoriteBook> readAll() {
        return favoriteBookRepository.findAll();
    }

    @Override
    public List<FavoriteBook> readByClientId(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            return client.get().getFavoriteBooks();
        } else {
            return new ArrayList<>();
        }
    }
}
