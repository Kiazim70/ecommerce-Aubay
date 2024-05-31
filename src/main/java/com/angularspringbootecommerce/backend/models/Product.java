package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String locale;
    private String name;
    private String description;
    private BigDecimal price;
    @Lob
    private byte[] image;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="category_id")
    private Category category;

    public void setCategoryId(Long categoryId) {
        this.category = this.getCategory();
    }
}