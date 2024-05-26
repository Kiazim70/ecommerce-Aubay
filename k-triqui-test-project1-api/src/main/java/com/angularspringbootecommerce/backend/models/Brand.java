package com.angularspringbootecommerce.backend.models;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import java.util.Set;

@Data
@Entity
@Table(name = "brands")
public class Brand extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String locale;
    private String brandname;
    @Lob
    private byte[] image;

    @Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "brand", fetch = FetchType.EAGER)
    private Set<Model> model;
}
