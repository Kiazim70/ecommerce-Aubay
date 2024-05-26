package com.angularspringbootecommerce.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.util.Set;

@Data
@Entity
@Table(name = "category_car")
public class CategoryCar extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String locale;
    private String nameCat;
    @Lob
    private byte[] image;

    @Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "categoryCar", fetch = FetchType.EAGER)
    private Set<ProductCar> productCars;
}
