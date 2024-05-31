package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "tarifautos")
public class TarifAuto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;
    private String model;
    private String registration;
    private String local;
    private String zipcode;
    private String city;
    private LocalDate dateOfBirth;
    private Integer ageObtainingPermit;
    private String bonus;
    private String lastname;
    private String firstname;
    private String phone;
    private String email;
}
