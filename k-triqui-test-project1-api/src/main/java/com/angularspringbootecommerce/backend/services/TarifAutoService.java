package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.exceptions.TarifAutoNotFoundException;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.models.TarifAuto;
import com.angularspringbootecommerce.backend.repository.TarifAutoRepository;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class TarifAutoService {

    private final TarifAutoRepository tarifAutoRepository;

    public TarifAuto saveTarifAuto(TarifAuto tarifAuto) {
        return tarifAutoRepository.save(tarifAuto);

    }

    public Page<TarifAuto> findAllTarifAuto(String searchTerm, String currentLanguage, Pageable pageable) {
        return tarifAutoRepository.findAllByLocaleAndNameContaining(currentLanguage, searchTerm, pageable);

    }

    public Page<TarifAuto> findAllTarifAutoByLocal(String searchTerm, String currentLanguage, Pageable pageable) {
        return tarifAutoRepository.findAllByLocaleAndNameContaining(currentLanguage, searchTerm, pageable);

    }

    public TarifAuto updateTarifAuto(Long id, TarifAuto tarifAutoDetails) {
            TarifAuto tarifAuto = tarifAutoRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("TarifAuto not found for this id :: " + id));

            tarifAuto.setBrand(tarifAutoDetails.getBrand());
            tarifAuto.setModel(tarifAutoDetails.getModel());
            tarifAuto.setRegistration(tarifAutoDetails.getRegistration());
            tarifAuto.setLocal(tarifAutoDetails.getLocal());
            tarifAuto.setZipcode(tarifAutoDetails.getZipcode());
            tarifAuto.setCity(tarifAutoDetails.getCity());
            tarifAuto.setDateOfBirth(tarifAutoDetails.getDateOfBirth());
            tarifAuto.setAgeObtainingPermit(tarifAutoDetails.getAgeObtainingPermit());
            tarifAuto.setBonus(tarifAutoDetails.getBonus());
            tarifAuto.setLastname(tarifAutoDetails.getLastname());
            tarifAuto.setFirstname(tarifAutoDetails.getFirstname());
            tarifAuto.setPhone(tarifAutoDetails.getPhone());
            tarifAuto.setEmail(tarifAutoDetails.getEmail());

            return tarifAutoRepository.save(tarifAuto);
        }
        public TarifAuto getTarifAutoById(Long id) throws TarifAutoNotFoundException {
            return tarifAutoRepository.findById(id).orElseThrow(() -> new TarifAutoNotFoundException("TarifAuto not found with id: " + id));
        }

    public Map<String, Boolean> deleteTarifAuto(Long tarifAutoId) {
        TarifAuto tarifAuto = tarifAutoRepository.findById(tarifAutoId)
                .orElseThrow(() -> new ResourceNotFoundException("tarifAuto not found for this id :: " + tarifAutoId));

        tarifAutoRepository.delete(tarifAuto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}


