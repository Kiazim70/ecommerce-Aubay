package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.models.CreditCard;
import com.angularspringbootecommerce.backend.services.CreditCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/creditCards")
public class CreditCardController {

    private final CreditCardService creditCardService;


    @GetMapping("/all")
    public Page<CreditCard> getCreditCard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm) {
        // Créer une requête de pagination
        PageRequest pageable = PageRequest.of(page, size);

        // Appeler le service pour récupérer les clients en fonction de la pagination et de la recherche
        return creditCardService.getCreditCards(pageable, searchTerm);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCreditCardById(@PathVariable Long id) {
        Optional<CreditCard> creditCardOptional = creditCardService.getCreditCardsById(id);

        if (creditCardOptional.isPresent()) {
            CreditCard creditCard = creditCardOptional.get();
            return ResponseEntity.ok(creditCard);
        } else {
            throw new AppException("customer not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<CreditCard> addCreditCard(
            @Valid @RequestBody CreditCard creditCard,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm) {
        Pageable pageable = PageRequest.of(page, size);
        CreditCard addCreditCard = creditCardService.addCreditCard(creditCard);
        return ResponseEntity.ok(addCreditCard);
    }
}
