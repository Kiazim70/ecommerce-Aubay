package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.models.Card;
import com.angularspringbootecommerce.backend.services.CardService;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.ClassFileVersion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;


@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/cards")
public class CardController {
    @Autowired
    private CardService cardService;


    @GetMapping("/paginated")
    public ResponseEntity<Page<Card>> getPaginatedCards(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "10") int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Card> cards = cardService.findAll(pageable);
        return ResponseEntity.ok(cards);
    }
}
