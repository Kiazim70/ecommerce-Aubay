package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT * FROM customers c WHERE " +
            "c.lastname LIKE CONCAT('%',:query,'%')" +" OR "+
            "c.firstname LIKE CONCAT('%',:query,'%')" +" OR "+
            "c.email LIKE CONCAT('%',:query,'%')" +" OR "+
            "c.phone LIKE CONCAT('%',:query,'%')", nativeQuery = true)
    List<Customer> searchCustomer(String query);


    @Query(value = "SELECT * FROM customers \n" +
            "WHERE firstName LIKE CONCAT('%',:searchTerm,'%') OR lastName LIKE CONCAT('%',:searchTerm,'%') \n" +
            "ORDER BY id",
            countQuery = "SELECT count(*) FROM customers",
            nativeQuery = true)
    Page<Customer> findByCustomer(String searchTerm, PageRequest pageable);
}
