package org.example.backend.controller;

import org.example.backend.dto.FavoriteBookDto;
import org.example.backend.dto.ResMessage;
import org.example.backend.mapper.FavoriteBookMapper;
import org.example.backend.model.FavoriteBook;
import org.example.backend.service.FavoriteBookServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/client")
public class FavoriteBookController {

    final FavoriteBookServiceImpl favoriteBookService;
    final FavoriteBookMapper favoriteBookMapper;

    public FavoriteBookController(FavoriteBookServiceImpl favoriteBookService, FavoriteBookMapper favoriteBookMapper) {
        this.favoriteBookService = favoriteBookService;
        this.favoriteBookMapper = favoriteBookMapper;
    }

    @GetMapping("/favorite-book")
    private ResponseEntity<List<FavoriteBookDto>> readAll() {
        List<FavoriteBookDto> bookDtos = favoriteBookMapper.toDto(favoriteBookService.readAll());
        return new ResponseEntity<>(bookDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}/favorite-book")
    private ResponseEntity<List<FavoriteBookDto>> read(@PathVariable Long id) {
        List<FavoriteBookDto> bookDtos = favoriteBookMapper.toDto(favoriteBookService.readByClientId(id));
        return new ResponseEntity<>(bookDtos, HttpStatus.OK);
    }

    @PostMapping("/{id}/favorite-book")
    private ResponseEntity<ResMessage> save(@PathVariable Long id, @RequestBody @Valid FavoriteBookDto bookDto) {
        FavoriteBook book = favoriteBookMapper.toEntity(bookDto);
        if (favoriteBookService.save(book, id)) {
            return new ResponseEntity<>(new ResMessage("Книга добавлена в избранное"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResMessage("Ошибка при добовлении книги"), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{clientId}/favorite-book/{bookId}")
    private ResponseEntity<ResMessage> delete(@PathVariable String clientId, @PathVariable Long bookId) {
        if (favoriteBookService.delete(bookId)) {
            return new ResponseEntity<>(new ResMessage("Фильм удалён из избранного"), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResMessage("Ошибка при удалении"), HttpStatus.BAD_REQUEST);
    }
}
