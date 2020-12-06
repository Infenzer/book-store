package org.example.backend.repository;

import org.example.backend.model.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByBookId(String bookId);
}
