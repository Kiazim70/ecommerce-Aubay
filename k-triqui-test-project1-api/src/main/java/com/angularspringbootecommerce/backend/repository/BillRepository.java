package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Bill;
import com.angularspringbootecommerce.backend.models.Product;
import com.google.common.primitives.Longs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query(value = "SELECT * FROM bills b WHERE b.locale = ? ", nativeQuery = true)
    List<Bill> findBillsByLocales(String currentLanguage);


//    List<Bill> findBillByLocales(String currentLanguage);

//    List<Bill> searchBill(String query);

//    Page<Bill> findByBillAndLocale(String currentLanguage, PageRequest pageable, String query);
}
