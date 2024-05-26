package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.CategoryCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryCarRepository extends JpaRepository<CategoryCar, Long> {

   @Query(value = "SELECT * FROM category_car c WHERE c.locale = ? AND c.id = id", nativeQuery = true)

//   @Query(value = "SELECT c.*, p.category_car_id FROM category_car c " +
//           "JOIN product_cars p ON c.id = p.category_car_id " +
//           "AND p.locale = c.locale WHERE c.locale = ?", nativeQuery = true)
   List<CategoryCar> findCategoryCarsByLocales(String currentLanguage);
}
