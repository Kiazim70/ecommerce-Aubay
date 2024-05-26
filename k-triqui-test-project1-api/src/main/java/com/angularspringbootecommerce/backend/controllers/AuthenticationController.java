package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.UserDto;
import com.angularspringbootecommerce.backend.dtos.UserLoginDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.models.User;
import com.angularspringbootecommerce.backend.services.AuthenticationService;
import com.angularspringbootecommerce.backend.services.MessageByLocaleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private MessageByLocaleService messageByLocaleService;

    @PostMapping("/register")
    public User register(@Valid @RequestBody UserDto user) {
        if (user.getEmail() == null || user.getEmail().isEmpty() || user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new AppException(messageByLocaleService.getMessage("register.invalid"), HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        return authenticationService.register(user.getEmail(), user.getPassword());
    }

    @PostMapping("/login")
    public UserLoginDto login(@Valid @RequestBody UserDto user) {
        UserLoginDto userLoginDto = authenticationService.login(user.getEmail(), user.getPassword());

        if (userLoginDto.getUser() == null) {
            throw new AppException(messageByLocaleService.getMessage("login.invalid"), HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        return userLoginDto;
    }
}
