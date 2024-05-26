package com.angularspringbootecommerce.backend.dtos;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class CategoryDto {
    private Long id;
    private String locale;
    private String nameCat;
    @Lob
    private byte[] image;
}
