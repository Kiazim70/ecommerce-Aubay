package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Category;
import com.angularspringbootecommerce.backend.models.CreditCard;
import com.angularspringbootecommerce.backend.models.ProductCar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

//    @Query(value = "SELECT * FROM creditcards c WHERE c.card_number LIKE %:searchTerm%", nativeQuery = true)
//    Page<CreditCard> findByCreditCard(String searchTerm, PageRequest pageable);

    @Query(value = "SELECT * FROM creditcards c WHERE c.customer.id = :customer_id AND (c.cardNumber LIKE %:searchTerm% OR c.expiryDate LIKE %:searchTerm% OR c.cvv LIKE %:searchTerm%)", nativeQuery = true)
    Page<ProductCar> findCreditCardBycustomer(Long customer_id, String searchTerm, Pageable pageable);

    Page<CreditCard> findBycardNumberContainingIgnoreCase(String searchTerm, Pageable pageable);
}
