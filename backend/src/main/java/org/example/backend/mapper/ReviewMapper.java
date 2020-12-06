package org.example.backend.mapper;

import org.example.backend.dto.client.ClientDto;
import org.example.backend.dto.review.ReviewDto;
import org.example.backend.model.review.Review;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewMapper {
    final ModelMapper modelMapper;
    final ClientMapper clientMapper;

    public ReviewMapper(ModelMapper modelMapper, ClientMapper clientMapper) {
        this.modelMapper = modelMapper;
        this.clientMapper = clientMapper;
    }

    @PostConstruct
    private void startSetup() {
        modelMapper.createTypeMap(Review.class, ReviewDto.class)
                .addMappings(mapping -> mapping.skip(ReviewDto::setDate))
                .setPostConverter(toDotConvector());
    }

    private Converter<Review, ReviewDto> toDotConvector() {
        return context -> {
            Review source = context.getSource();
            ReviewDto destination = context.getDestination();

            DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
            String createDate = dateFormat.format(source.getCreate());
            destination.setDate(createDate);

            ClientDto owner = clientMapper.toDto(source.getClient());
            owner.setPassword(null);
            destination.setOwner(owner);

            return destination;
        };
    }

    public ReviewDto toDto(Review review) {
        return modelMapper.map(review, ReviewDto.class);
    }

    public Review toEntity(ReviewDto reviewDto) {
        return modelMapper.map(reviewDto, Review.class);
    }

    public List<ReviewDto> toDto(List<Review> reviews) {
        return reviews.stream().map(this::toDto).collect(Collectors.toList());
    }
}
