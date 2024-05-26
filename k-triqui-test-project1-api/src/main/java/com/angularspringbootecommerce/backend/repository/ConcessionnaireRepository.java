package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Concessionnaire;
import com.angularspringbootecommerce.backend.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConcessionnaireRepository extends JpaRepository<Concessionnaire, Long> {
//    @Query(value = "SELECT * FROM concessionnaires c WHERE " +
//            "c.name_compagny LIKE CONCAT('%',:query,'%')" +" OR "+
//            "c.nsiret LIKE CONCAT('%',:query,'%')" +" OR "+
//            "c.email LIKE CONCAT('%',:query,'%')" +" OR "+
//            "c.phone LIKE CONCAT('%',:query,'%')", nativeQuery = true)
//    List<Concessionnaire> searchConcessionnaire(String query);

    @Query(value = "SELECT * FROM concessionnaires c WHERE c.name_compagny LIKE %:searchTerm% OR" +
            " c.nsiret LIKE %:searchTerm% OR" +
            " c.email LIKE %:searchTerm% OR" +
            " c.phone LIKE %:searchTerm%", nativeQuery = true)
    Page<Concessionnaire> findByConcessionnaire(String searchTerm, PageRequest pageable);

//    @Query(value = "SELECT c FROM Concessionnaires c WHERE c.name_compagny LIKE %:query% ")
//    List<Concessionnaire> searchCarsByQueryAndLanguage(String query);
}
