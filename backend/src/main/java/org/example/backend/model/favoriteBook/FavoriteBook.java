package org.example.backend.model.favoriteBook;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.model.BaseEntity;
import org.example.backend.model.client.Client;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "favorite_books")
public class FavoriteBook extends BaseEntity {
    private String bookId;
    private String title;
    private String saleability;
    private Float amount;
    private String currencyCode;
    private String thumbnail;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Client client;
}
