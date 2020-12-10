package org.example.backend.dto.review;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.dto.BaseDto;
import org.example.backend.dto.client.ClientDto;

import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReviewDto extends BaseDto {

    @NotNull
    private Integer score;

    @NotNull
    private String bookId;

    private ClientDto owner;

    private String message;

    private String date;
}
