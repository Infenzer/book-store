package org.example.backend.dto.favoriteBook;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.dto.BaseDto;

import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
public class FavoriteBookDto extends BaseDto {
    @NotNull
    private String bookId;

    @NotNull
    private String title;

    private String saleability;
    private Float amount;
    private String currencyCode;
    private String thumbnail;

}
