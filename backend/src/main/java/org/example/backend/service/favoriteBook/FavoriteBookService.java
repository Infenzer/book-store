package org.example.backend.service.favoriteBook;

import org.example.backend.model.favoriteBook.FavoriteBook;

import java.util.List;

public interface FavoriteBookService {
    boolean save(FavoriteBook book, Long clientId);
    boolean delete(String id);
    List<FavoriteBook> readAll();
    List<FavoriteBook> readByClientId(Long id);
}
