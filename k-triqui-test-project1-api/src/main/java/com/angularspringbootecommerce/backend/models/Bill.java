package com.angularspringbootecommerce.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "locale")
    private String locale;

    @Column(name = "billing_date")
    private Date billingDate;

    @Column(name = "billing_number")
    private String billingnumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "concessionnaire_id")
    private Concessionnaire concessionnaire;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customers;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_car_id")
    private ProductCar productCars;
}

