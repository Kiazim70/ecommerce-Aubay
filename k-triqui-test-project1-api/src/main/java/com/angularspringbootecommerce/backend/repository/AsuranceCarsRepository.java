package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.AssuranceCars;
import com.angularspringbootecommerce.backend.models.ProductCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsuranceCarsRepository extends JpaRepository<AssuranceCars, Long> {

    @Query(value = "SELECT * FROM assurancecars a WHERE a.locale = ? AND a.id = id", nativeQuery = true)
    List<AssuranceCars> findAssuranceCarsByLocales(String currentLanguage);
}
