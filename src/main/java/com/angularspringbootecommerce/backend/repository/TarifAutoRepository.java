package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.TarifAuto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TarifAutoRepository extends JpaRepository<TarifAuto, Long> {

    @Query(value = "SELECT * FROM tarifautos t WHERE t.local = :currentLanguage AND t.firstname LIKE %:searchTerm%", nativeQuery = true)
    Page<TarifAuto> findAllByLocaleAndNameContaining(@Param("currentLanguage") String currentLanguage,
                                                     @Param("searchTerm") String searchTerm,
                                                     Pageable pageable);

}
