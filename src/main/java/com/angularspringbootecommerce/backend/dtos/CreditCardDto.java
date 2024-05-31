package com.angularspringbootecommerce.backend.dtos;


import com.angularspringbootecommerce.backend.models.Customer;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;


@Data
public class CreditCardDto {
    private Long id;
    private String cardNumber;
    private LocalDate expiryDate;
    private int cvv;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
