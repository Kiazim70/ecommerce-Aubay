package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Brand;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    @Query(value = "SELECT * FROM brands b WHERE b.locale = ? AND b.id = id", nativeQuery = true)
    List<Brand> findBrandByLocales(String currentLanguage);
}
