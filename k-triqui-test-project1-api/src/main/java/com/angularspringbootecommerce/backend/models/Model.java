package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "modely")
public class Model extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String locale;
    private String modelname;
    private String description;
    private Double price;
    @Lob
    private byte[] image;
    private String city;
    private String country;
    private String zipcode;

    @ManyToOne
    private Brand brand;
}
