package com.angularspringbootecommerce.backend.dtos;

import com.angularspringbootecommerce.backend.models.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CustomerDto {

    private Long id;
    private String lastname;
    private String firstname;
    private String email;
    private String phone;
    private String adress;
    private String zipcode;
    private String country;
}
