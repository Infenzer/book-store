package org.example.backend.mapper;

import org.example.backend.dto.favoriteBook.FavoriteBookDto;
import org.example.backend.model.favoriteBook.FavoriteBook;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FavoriteBookMapper {
    final ModelMapper modelMapper;

    public FavoriteBookMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public FavoriteBookDto toDto(FavoriteBook book) {
        return modelMapper.map(book, FavoriteBookDto.class);
    }

    public FavoriteBook toEntity(FavoriteBookDto bookDto) {
        return modelMapper.map(bookDto, FavoriteBook.class);
    }

    public List<FavoriteBook> toEntity(List<FavoriteBookDto> bookDtoList) {
        return bookDtoList.stream().map(this::toEntity).collect(Collectors.toList());
    }

    public List<FavoriteBookDto> toDto(List<FavoriteBook> books) {
        return books.stream().map(this::toDto).collect(Collectors.toList());
    }
}
