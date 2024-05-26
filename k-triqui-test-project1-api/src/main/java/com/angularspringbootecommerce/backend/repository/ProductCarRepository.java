package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.ProductCar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCarRepository extends JpaRepository<ProductCar, Long> {

    @Query(value = "SELECT * FROM product_cars p WHERE p.locale = ? ", nativeQuery = true)
    List<ProductCar> findProductCarsByLocales(String currentLanguage);

    @Query(value = "SELECT * FROM product_cars p WHERE " +
            "p.locale LIKE CONCAT('%',:query,'%')" + " OR " +
            "p.name LIKE CONCAT('%',:query,'%')" + " OR " +
            "p.description LIKE CONCAT('%',:query,'%')" + " OR " +
            "p.image LIKE CONCAT('%',:query,'%')" + " OR " +
            "p.price LIKE CONCAT('%',:query,'%')", nativeQuery = true)
    List<ProductCar> searchProductCar(String query);


//    @Query(value = "SELECT * FROM productCars p " +
//            "INNER JOIN categories c on c.id = p.categoryCar_id" +
//            "WHERE c.name = :categoryCar " +
//            "AND (p.name LIKE CONCAT('%',:query,'%')" +" OR "+
//            "p.description LIKE CONCAT('%',:query,'%')" +" OR "+
//            "p.image LIKE CONCAT('%',:query,'%')" +" OR "+
//            "p.price LIKE CONCAT('%',:query,'%'))", nativeQuery = true)
//@Query(value = "SELECT * FROM product_cars p WHERE p.locale = ? ", nativeQuery = true)
//Page<ProductCar> findByProductCar(String categoryCar, PageRequest pageable);

    @Query(value = "SELECT * FROM product_cars p WHERE p.locale = :categoryCarId", nativeQuery = true)
    Page<ProductCar> findByCategoryCarId(@Param("categoryCar") Integer categoryCarId, PageRequest pageable);

    @Query(value = "SELECT pc FROM ProductCar pc WHERE pc.name LIKE %:query% AND pc.locale = :currentLanguage")
    List<ProductCar> searchCarsByQueryAndLanguage(String query, String currentLanguage);




    // @Query(value = "SELECT * FROM Product_cars p WHERE p.category_car_id = :categoryId AND p.locale = ?", nativeQuery = true)

//    @Query(value = "SELECT pc FROM ProductCar pc WHERE pc.categoryCar.id = :id AND pc.locale = :currentLanguage",
//            countQuery = "SELECT COUNT(pc) FROM ProductCar pc WHERE pc.categoryCar.id = :id AND pc.locale = :currentLanguage")
//    @Query(value = "SELECT pc FROM ProductCar pc WHERE pc.categoryCar.id = :id AND pc.locale = :currentLanguage " +
//            "AND (pc.name LIKE CONCAT('%', :searchTerm, '%') OR pc.description LIKE CONCAT('%', :searchTerm, '%'))",
//            countQuery = "SELECT COUNT(pc) FROM ProductCar pc WHERE pc.categoryCar.id = :id AND pc.locale = :currentLanguage " +
//                    "AND (pc.name LIKE CONCAT('%', :searchTerm, '%') OR pc.description LIKE CONCAT('%', :searchTerm, '%'))")

    //    @Query(value= " SELECT * \n" +
//            "FROM ProductCar pc \n" +
//            "JOIN CategoryCar c ON pc.category_car_id = c.id \n" +
//            "WHERE c.id = ? AND pc.locale = ? \n" +
//            "ORDER BY pc.category_car_id ASC ", nativeQuery = true)
    @Query(value = "SELECT * FROM product_cars pc WHERE pc.category_car_id = :category_car_id AND pc.locale = :currentLanguage AND pc.name LIKE CONCAT('%',:searchTerm,'%')",
            countQuery = "SELECT count(*) FROM product_cars pc WHERE pc.category_car_id = :category_car_id AND pc.locale = :currentLanguage",
            nativeQuery = true)
    Page<ProductCar> findCarsByCategoryIdAndLanguage(@Param("category_car_id") int category_car_id, @Param("currentLanguage") String currentLanguage, @Param("searchTerm") String searchTerm, Pageable pageable);

    @Query(value = "SELECT * FROM product_cars pc WHERE pc.category_car_id = :id AND pc.locale = :currentLanguage", nativeQuery = true)
    Page<ProductCar> findByCategoryCarIdAndLocale(@Param("id") Integer id, @Param("currentLanguage") String currentLanguage, Pageable pageable);


    @Query(value = "SELECT * FROM product_cars pc WHERE pc.locale = :locale", nativeQuery = true)
    Page<ProductCar> findByLocale(@Param("locale") String locale, Pageable pageable);


    @Query(value = "SELECT * FROM product_cars p WHERE p.locale = :currentLanguage AND p.category_car_id = :category_car_id", nativeQuery = true)
    List<ProductCar> carsByLocale(String currentLanguage, Integer category_car_id);
//
//    @Query(value = "SELECT * FROM product_cars p WHERE p.locale = :currentLanguage AND p.category_car_id = :category_car_id", nativeQuery = true)
//    Page<ProductCar> findByCategoryId(Long categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM product_cars p WHERE p.locale = :currentLanguage AND p.category_car_id = :category_car_id", nativeQuery = true)
    Page<ProductCar> findByCategoryId(Long category_car_id, String currentLanguage, Pageable pageable);

    @Query(value = "SELECT * FROM product_cars pc WHERE pc.locale = :currentLanguage AND pc.name LIKE :searchTerm",
            countQuery = "SELECT count(*) FROM product_cars pc WHERE pc.locale = :currentLanguage AND pc.name LIKE :searchTerm", nativeQuery = true)
    Page<ProductCar> getAllCars(@Param("searchTerm") String searchTerm, @Param("currentLanguage") String currentLanguage, Pageable pageable);

    Page<ProductCar> findAllByLocaleAndNameContaining(String currentLanguage, String searchTerm, Pageable pageable);

    @Query(value = "SELECT * FROM product_cars pc WHERE pc.id = :id ", nativeQuery = true)
    List<ProductCar> findByCarId(Long id);
}

