package com.angularspringbootecommerce.backend.dtos;

import jakarta.persistence.Lob;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private String locale;
    private String name;
    private String description;
    private BigDecimal price;
    @Lob
    private byte[] image;

}
