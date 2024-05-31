package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
}
