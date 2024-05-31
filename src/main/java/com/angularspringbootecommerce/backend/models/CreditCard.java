package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;


@Data
@Entity
@Table(name = "creditcards")
public class CreditCard extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String cardNumber;
    private LocalDate expiryDate;
    private int cvv;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;


}
