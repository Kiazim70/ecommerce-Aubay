package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM products p WHERE " +
            "p.locale LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.name LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.description LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.image LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.price LIKE CONCAT('%',:query,'%')", nativeQuery = true)
    List<Product> searchProduct(String query);
//    @Query(value = "SELECT * FROM products p WHERE " +
//            "p.locale = 'en'" +" OR "+
//            "p.locale = 'fr'" +" OR "+
//            "p.locale = 'de'", nativeQuery = true)
//    List<Product> findByLocale(Locale locale);


//    @Query(value = "SELECT \n" +
//            "    p.id, \n" +
//            "    CASE \n" +
//            "        WHEN p.locale = 'en' THEN p.name\n" +
//            "        WHEN p.locale = 'fr' THEN p.name\n" +
//            "        WHEN p.locale = 'de' THEN p.name\n" +
//            "        ELSE p.name\n" +
//            "    END AS name,\n" +
//            "    CASE \n" +
//            "        WHEN p.locale = 'en' THEN p.description\n" +
//            "        WHEN p.locale = 'fr' THEN p.description\n" +
//            "        WHEN p.locale = 'de' THEN p.description\n" +
//            "        ELSE p.description\n" +
//            "    END AS description\n" +
//            "    CASE \n" +
//            "        WHEN p.locale = 'en' THEN p.price\n" +
//            "        WHEN p.locale = 'fr' THEN p.price\n" +
//            "        WHEN p.locale = 'de' THEN p.price\n" +
//            "        ELSE p.price\n" +
//            "    END AS price\n" +
//            "FROM products p\n" +
//            "WHERE p.locale = 'de'", nativeQuery = true)

//    @Query(value = "SELECT * FROM products p WHERE p.locale IN ('en', 'fr', 'de')", nativeQuery = true)
    @Query(value = "SELECT * FROM products p WHERE p.locale = ?", nativeQuery = true)
    List<Product> findProductsByLocales(String currentLanguage);


    @Query(value = "SELECT * FROM products p " +
            "INNER JOIN categories c on c.id = p.category_id" +
            "WHERE c.name = :category " +
            "AND (p.name LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.description LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.image LIKE CONCAT('%',:query,'%')" +" OR "+
            "p.price LIKE CONCAT('%',:query,'%'))", nativeQuery = true)
    Page<Product> findByProduct(String query, String category, Pageable pageable);

    @Query(value = "SELECT * FROM products p " +
            "INNER JOIN category c on c.id = p.category_id " +
            "WHERE c.name = :category ", nativeQuery = true)
    Page<Product> findAll(String category, Pageable pageable);

    Page<Product> findByCategoryId(String categoryId, PageRequest pageable);

    Page<Product> findByCategoryIdAndNameContainingIgnoreCase(String categoryId, String query, PageRequest pageable);

    @Query(value = "SELECT p FROM Products p WHERE p.category.id = :categoryId AND p.language = :currentLanguage", nativeQuery = true)
    Page<Product> findByCategoryIdAndLanguage(String categoryId, String currentLanguage, PageRequest pageable);

    @Query(value = "SELECT p FROM Products p WHERE p.category.id = :categoryId AND p.name LIKE %:query% AND p.language = :currentLanguage", nativeQuery = true)
    Page<Product> findByCategoryIdAndNameContainingAndLanguage(String categoryId, String query, String currentLanguage, PageRequest pageable);

    @Query(value = "SELECT * FROM products p " +
            "INNER JOIN category c ON p.category_id = c.id " +
            "WHERE (p.locale LIKE CONCAT('%', :currentLanguage, '%') OR p.name LIKE CONCAT('%', :query, '%')) " +
            "AND c.id = :categoryId " +
            "ORDER BY p.id",
            countQuery = "SELECT COUNT(*) FROM products p " +
                    "INNER JOIN category c ON p.category_id = c.id " +
                    "WHERE (p.locale LIKE CONCAT('%', :currentLanguage, '%') OR p.name LIKE CONCAT('%', :query, '%')) " +
                    "AND c.id = :categoryId",
            nativeQuery = true)
    Page<Product> findByProductAndLocale(String currentLanguage, String query, String categoryId, PageRequest pageable);
    @Query(value = "SELECT * FROM products p WHERE p.category_id = :category_id AND p.locale = :currentLanguage AND p.name LIKE %:searchTerm%", nativeQuery = true)
    Page<Product> findAllByLocaleAndCategoryAndNameContaining(@Param("category_id") Long category_id,
                                                              @Param("currentLanguage") String currentLanguage,
                                                              @Param("searchTerm") String searchTerm,
                                                              Pageable pageable);




    @Query(value = "SELECT * FROM products p WHERE p.locale = :currentLanguage AND p.name LIKE %:searchTerm%", nativeQuery = true)
    Page<Product> findAllByLocaleAndNameContaining(@Param("currentLanguage") String currentLanguage,
                                                   @Param("searchTerm") String searchTerm,
                                                   Pageable pageable);


}
