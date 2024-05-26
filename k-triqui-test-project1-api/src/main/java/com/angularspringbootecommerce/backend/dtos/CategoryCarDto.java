package com.angularspringbootecommerce.backend.dtos;

import jakarta.persistence.Lob;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

@Data
public class CategoryCarDto {
    private Long id;
    private String locale;
    private String nameCat;
    @Lob
    private byte[] image;
}
