package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Set;

@Data
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String lastname;
    private String Firstname;
    private String email;
    private String phone;
    private String adress;
    private String zipcode;
    private String country;

    @Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER)
    private Set<CreditCard> creditcard;
}
