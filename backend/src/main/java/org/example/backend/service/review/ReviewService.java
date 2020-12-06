package org.example.backend.service.review;

import org.example.backend.model.review.Review;

import java.util.List;

public interface ReviewService {
    List<Review> findAllByBookId(String bookId);
    boolean saveReview(Review review, Long clientId);
    boolean deleteReview(Long id);
}
