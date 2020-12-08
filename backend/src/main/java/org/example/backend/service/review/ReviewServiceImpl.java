package org.example.backend.service.review;

import org.example.backend.model.client.Client;
import org.example.backend.model.review.Review;
import org.example.backend.repository.ClientRepository;
import org.example.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    final ReviewRepository reviewRepository;
    final ClientRepository clientRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ClientRepository clientRepository) {
        this.reviewRepository = reviewRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public List<Review> findAllByBookId(String bookId) {
        return reviewRepository.findAllByBookId(bookId);
    }

    @Override
    public Optional<Review> saveReview(Review review, Long clientId) {
        Optional<Client> client = clientRepository.findById(clientId);
        if (client.isPresent()) {
            review.setClient(client.get());
            Review savedReview = reviewRepository.save(review);
            return Optional.of(savedReview);
        }

        return Optional.empty();
    }

    @Override
    public boolean deleteReview(Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
