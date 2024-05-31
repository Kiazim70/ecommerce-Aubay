package com.angularspringbootecommerce.backend.models;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "assurancecars")
public class AssuranceCars extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String locale;
    private String name;
    @Lob
    private byte[] image;

}
