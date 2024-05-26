package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Model;
import com.angularspringbootecommerce.backend.models.ProductCar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    @Query(value = "SELECT * FROM modely m WHERE m.locale = ? AND m.id = id", nativeQuery = true)
    List<Model> findModelBrandsByLocales(String currentLanguage);


    @Query(value = "SELECT * FROM modely mb WHERE mb.brand_id = :brand_id AND mb.locale = :currentLanguage AND mb.modelname LIKE CONCAT('%', :searchTerm, '%')",
            countQuery = "SELECT count(*) FROM modely mb WHERE mb.brand_id = :brand_id AND mb.locale = :currentLanguage",
            nativeQuery = true)
    Page<Model> getfindModelByBrandsIdAndLanguage(@Param("brand_id") int brand_id, @Param("searchTerm") String searchTerm, @Param("currentLanguage") String currentLanguage, Pageable pageable);

    @Query(value = "SELECT * FROM Model m WHERE m.locale = :currentLanguage AND m.modelname LIKE CONCAT('%', :searchTerm, '%')", nativeQuery = true)
    Page<Model> findAllByLocaleAndModelNameContaining(String currentLanguage, String searchTerm, Pageable pageable);

    @Query(value = "SELECT * FROM modely m " +
            "INNER JOIN brands b ON m.brand_id = b.id " +
            "WHERE (m.locale LIKE CONCAT('%', :currentLanguage, '%') OR m.modelname LIKE CONCAT('%', :query, '%')) " +
            "AND b.id = :brand_id " +
            "ORDER BY p.id", nativeQuery = true)
    Page<Model> findByModelAndLocale(String currentLanguage, String query, String brand_id, PageRequest pageable);

    @Query(value = "SELECT * FROM Modely m WHERE m.locale = :currentLanguage AND m.modelname LIKE CONCAT('%', :searchTerm, '%')", nativeQuery = true)
    Page<Model> findAllByLocaleAndNameContaining(@Param("currentLanguage") String currentLanguage,
                                     @Param("searchTerm") String searchTerm,
                                     Pageable pageable);
//
//    @Query(value = "SELECT * FROM modely m WHERE m.brand_id = :brand_id AND m.locale = :currentLanguage AND m.modelname LIKE CONCAT('%',:searchTerm,'%')",
//            countQuery = "SELECT count(*) FROM modely m WHERE brand_id = :brand_id AND m.locale = :currentLanguage",
//            nativeQuery = true)
//    Page<Model> findModelsByBrandIdAndLanguage(int brand_id, String searchTerm, String currentLanguage, Pageable pageable);

    @Query(value = "SELECT * FROM modely m " +
            "WHERE m.brand_id = :brand_id " +
            "AND m.locale = :currentLanguage " +
            "AND (m.modelname LIKE CONCAT('%',:searchTerm,'%') " +
            "OR m.city LIKE CONCAT('%',:searchTerm,'%'))",
            countQuery = "SELECT count(*) FROM modely m WHERE brand_id = :brand_id AND m.locale = :currentLanguage",
            nativeQuery = true)
    Page<Model> findModelsByBrandIdAndLanguage(int brand_id, String searchTerm, String currentLanguage, Pageable pageable);


    @Query(value = "SELECT * FROM modely m WHERE m.id = :id", nativeQuery = true)
    Optional<Model> findByModelId(@Param("id") Long id);

//    @Query(value = "SELECT * FROM modely m WHERE m.id = :id AND m.locale = :currentLanguage", nativeQuery = true)
//    Optional<Model> findByIdAndLanguage(@Param("id") Long modelId, @Param("currentLanguage") String currentLanguage);

}

