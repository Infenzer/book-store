package org.example.backend.model.role;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.model.BaseEntity;
import org.example.backend.model.client.Client;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity(name = "roles")
public class Role extends BaseEntity {

    private String name;

    @ManyToMany(mappedBy = "roles", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<Client> clients;
}
