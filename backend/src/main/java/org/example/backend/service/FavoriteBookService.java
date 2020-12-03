package org.example.backend.service;

import org.example.backend.model.FavoriteBook;

import java.util.List;

public interface FavoriteBookService {
    public boolean save(FavoriteBook book, Long clientId);
    public boolean delete(String id);
    public List<FavoriteBook> readAll();
    public List<FavoriteBook> readByClientId(Long id);
}
