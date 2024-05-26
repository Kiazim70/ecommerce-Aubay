package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "product_cars")
public class ProductCar extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String locale;
    private String name;
    private String description;
    private BigDecimal price;
    @Lob
    private byte[] image;

    @ManyToOne
    private CategoryCar categoryCar;


    public void setCategoryCarId(Long categoryId) {
        this.categoryCar = this.getCategoryCar();
    }


}
