package com.angularspringbootecommerce.backend.exceptions;

public class ResourceNotFoundException extends RuntimeException {


    public ResourceNotFoundException(String exception) {
        super(exception);
    }
}
