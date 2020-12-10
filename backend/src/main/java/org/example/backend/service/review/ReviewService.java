package org.example.backend.service.review;

import org.example.backend.model.review.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<Review> findAllByBookId(String bookId);
    Optional<Review> saveReview(Review review, Long clientId);
    boolean deleteReview(Long id);
}
