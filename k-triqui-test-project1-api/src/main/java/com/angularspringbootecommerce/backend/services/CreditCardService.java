package com.angularspringbootecommerce.backend.services;


import com.angularspringbootecommerce.backend.models.CreditCard;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.repository.CreditCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CreditCardService {

    private final CreditCardRepository creditCardRepository;

//    public CreditCard add(CreditCard creditCard) {
//
//        CreditCard creditCardadd = new CreditCard();
//        creditCardadd.getId();
//        creditCardadd.getCardNumber();
//        creditCardadd.getExpiryDate();
//        creditCardadd.getCvv();
//        creditCardadd.getCustomer_id();
//
//        return creditCardRepository.save(creditCardadd);


    public Page<CreditCard> getCreditCards(PageRequest pageable, String searchTerm) {
        return creditCardRepository.findBycardNumberContainingIgnoreCase(searchTerm, pageable);

    }

    public Optional<CreditCard> getCreditCardsById(Long id) {
        return creditCardRepository.findById(id);

    }

    public Page<ProductCar> findCreditCardByCustomer(Long customer_id, String searchTerm, Pageable pageable) {
        return creditCardRepository.findCreditCardBycustomer(customer_id, searchTerm, pageable);

    }

    public CreditCard addCreditCard(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }
//    public Page<CreditCard> getAllCreditCards(Pageable pageable, String searchTerm) {
//        if (StringUtils.hasText(searchTerm)) {
//            return creditCardRepository.findBycardNumberContainingIgnoreCase(searchTerm, pageable);
//        } else {
//            return creditCardRepository.findAll(pageable);
//        }
//    }


}

