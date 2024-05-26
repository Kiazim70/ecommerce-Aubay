package com.angularspringbootecommerce.backend.exceptions;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
public class AppException extends RuntimeException {

    private final HttpStatus httpStatus;

    public AppException(String message, HttpStatus httpStatus, HttpStatus badRequest) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
