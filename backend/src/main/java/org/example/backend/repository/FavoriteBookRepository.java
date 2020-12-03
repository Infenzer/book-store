package org.example.backend.repository;

import org.example.backend.model.FavoriteBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteBookRepository extends JpaRepository<FavoriteBook, Long> {
    Optional<FavoriteBook> findByBookId(String bookId);
}
