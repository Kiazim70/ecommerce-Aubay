package com.angularspringbootecommerce.backend.dtos;

import lombok.Data;

import java.math.BigInteger;

@Data
public class ConcessionnaireDto {
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
