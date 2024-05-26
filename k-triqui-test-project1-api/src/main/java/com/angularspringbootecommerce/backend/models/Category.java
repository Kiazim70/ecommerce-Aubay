package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import java.util.Set;

@Data
@Entity
@Table(name = "category")
public class Category extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String locale;
    private String name;
    @Lob
    private byte[] image;

    @Getter(AccessLevel.NONE)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;
}
