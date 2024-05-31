package com.angularspringbootecommerce.backend.dtos;

import com.angularspringbootecommerce.backend.models.Concessionnaire;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.models.ProductCar;
import lombok.Data;

import java.util.Collection;
import java.util.Date;

@Data
public class BillDto {
    private Long id;
    private String Locale;
    private Date billingDate;
    private Customer customer;
    private Concessionnaire concessionnaire;
    private Collection<ProductCar> productCar;
}
