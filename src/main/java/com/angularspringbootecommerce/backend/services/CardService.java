package com.angularspringbootecommerce.backend.services;


import com.angularspringbootecommerce.backend.models.Card;
import com.angularspringbootecommerce.backend.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class CardService {

    private final CardRepository cardReposiory;

    public Page<Card> findAll(PageRequest pageable) {
        return cardReposiory.findAll(pageable);
    }
}
