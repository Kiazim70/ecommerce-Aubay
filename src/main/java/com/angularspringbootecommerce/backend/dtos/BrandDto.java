package com.angularspringbootecommerce.backend.dtos;

import jakarta.persistence.Lob;
import lombok.Data;


@Data
public class BrandDto {
    private Long id;
    private String locale;
    private String brandname;
    @Lob
    private byte[] image;

}
