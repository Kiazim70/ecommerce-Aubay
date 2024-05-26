package com.angularspringbootecommerce.backend.services;


import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Concessionnaire;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.repository.ConcessionnaireRepository;
import com.angularspringbootecommerce.backend.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ConcessionnaireService {

    private final ConcessionnaireRepository concessionnaireRepository;


    public Concessionnaire add(Concessionnaire concessionnaire) {
        return concessionnaireRepository.save(concessionnaire);
    }

    public Optional<Concessionnaire> getConcessionnaireById(Long id) {
        return concessionnaireRepository.findById(id);
    }


    public Concessionnaire updateConcessionnaires(long concessionnaireId, Concessionnaire concessionnaire) {
        Concessionnaire concession = concessionnaireRepository.findById(concessionnaireId)
                .orElseThrow(() -> new ResourceNotFoundException("concessionnaire not found for this id :: " + concessionnaireId));

        concessionnaire.setId(concessionnaire.getId());
        concessionnaire.setNameCompagny(concessionnaire.getNameCompagny());
        concessionnaire.setEmail(concessionnaire.getEmail());
        concessionnaire.setPhone(concessionnaire.getPhone());
        concessionnaire.setFax(concessionnaire.getFax());
        concessionnaire.setAddress(concessionnaire.getAddress());
        concessionnaire.setZipcode(concessionnaire.getZipcode());
        concessionnaire.setCountry(concessionnaire.getCountry());

        final Concessionnaire updatedConcessionnaire = concessionnaireRepository.save(concessionnaire);
        return concessionnaire;
    }

    public Map<String, Boolean> deleteConcessionnaire(Long concessionnaireId) {
        Concessionnaire concessionnaire = concessionnaireRepository.findById(concessionnaireId)
                .orElseThrow(() -> new ResourceNotFoundException("concessionnaire not found for this id :: " + concessionnaireId));

        concessionnaireRepository.delete(concessionnaire);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Page<Concessionnaire> getConcessionnaires(PageRequest pageable, String searchTerm) {
        if (searchTerm != null && !searchTerm.isEmpty()) {
            // Si un terme de recherche est fourni, utiliser la méthode de recherche appropriée de votre repository
            return concessionnaireRepository.findByConcessionnaire("%" + searchTerm + "%", pageable);
        } else {
            // Sinon, récupérer tous les concessionnaires paginés
            return concessionnaireRepository.findAll(pageable);
        }
    }

    public List<Concessionnaire> getAllConcessionnaire() {
        return concessionnaireRepository.findAll();

    }


//    @Transactional
//    public List<Concessionnaire> searchConcessionnaires(String query) {
//        // Implémentez la logique pour rechercher des voitures en fonction de la langue actuelle
//        return concessionnaireRepository.searchCarsByQueryAndLanguage(query);
//    }

}


