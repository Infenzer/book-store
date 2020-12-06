package org.example.backend.model.review;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.model.BaseEntity;
import org.example.backend.model.client.Client;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "reviews")
public class Review extends BaseEntity {
    private String message;
    private Integer score;
    private String bookId;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Client client;
}
