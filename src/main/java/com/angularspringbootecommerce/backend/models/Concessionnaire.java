package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigInteger;

@Data
@Entity
@Table(name = "concessionnaires")
public class Concessionnaire extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nameCompagny;
    private String nsiret;
    private String email;
    private String phone;
    private String fax;
    private String address;
    private String zipcode;
    private String country;
}
