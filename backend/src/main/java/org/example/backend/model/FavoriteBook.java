package org.example.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

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
