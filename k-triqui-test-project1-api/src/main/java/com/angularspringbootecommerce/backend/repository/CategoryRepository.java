package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Category;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT * FROM category c WHERE c.locale = ? AND c.id = id", nativeQuery = true)
    List<Category> findCategoryProductsByLocales(String currentLanguage);
}
