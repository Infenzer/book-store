package org.example.backend.controller;

import org.example.backend.dto.messages.ResMessage;
import org.example.backend.dto.review.ReviewDto;
import org.example.backend.mapper.ReviewMapper;
import org.example.backend.model.review.Review;
import org.example.backend.service.review.ReviewServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    final ReviewServiceImpl reviewService;
    final ReviewMapper reviewMapper;

    public ReviewController(ReviewServiceImpl reviewService, ReviewMapper reviewMapper) {
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
    }

    @GetMapping("/{bookId}")
    private ResponseEntity<List<ReviewDto>> getReviews(@PathVariable String bookId) {
        List<Review> reviews = reviewService.findAllByBookId(bookId);
        List<ReviewDto> reviewDtoList = reviewMapper.toDto(reviews);
        return new ResponseEntity<>(reviewDtoList, HttpStatus.OK);
    }

    @PostMapping("/{clientId}")
    private ResponseEntity<ReviewDto> saveReview(@RequestBody @Valid ReviewDto reviewDto, @PathVariable Long clientId) {
        Optional<Review> savedReview = reviewService.saveReview(reviewMapper.toEntity(reviewDto), clientId);
        if (savedReview.isPresent()) {
            return new ResponseEntity<>(reviewMapper.toDto(savedReview.get()), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
