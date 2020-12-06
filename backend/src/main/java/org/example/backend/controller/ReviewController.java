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
    private ResponseEntity<ResMessage> saveReview(@RequestBody @Valid ReviewDto reviewDto, @PathVariable Long clientId) {
        if (reviewService.saveReview(reviewMapper.toEntity(reviewDto), clientId)) {
            return new ResponseEntity<>(new ResMessage("Отзыв сохранен успешно"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResMessage("Ошибка при сохранении отзыва"), HttpStatus.BAD_REQUEST);
    }

}
