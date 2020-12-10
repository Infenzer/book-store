package org.example.backend.model.client;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.model.BaseEntity;
import org.example.backend.model.favoriteBook.FavoriteBook;
import org.example.backend.model.review.Review;
import org.example.backend.model.role.Role;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "clients")
@Data
public class Client extends BaseEntity {

    private String login;
    private String email;
    private String password;

    @ManyToMany(
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH},
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name = "client_role",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id")
    private List<FavoriteBook> favoriteBooks;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id")
    private List<Review> reviews;
}
