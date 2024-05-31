package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.dtos.CustomerDto;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.exceptions.TarifAutoNotFoundException;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.models.TarifAuto;
import com.angularspringbootecommerce.backend.services.TarifAutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/tarifAutos")
public class TarifAutoController {

    @Autowired
    private TarifAutoService tarifAutoService;

    @PostMapping("/add")
    public ResponseEntity<TarifAuto> createTarifAuto(@RequestBody TarifAuto tarifAuto) {
        TarifAuto savedTarifAuto = tarifAutoService.saveTarifAuto(tarifAuto);
        return ResponseEntity.ok(savedTarifAuto);
    }

    @GetMapping("/tarifedautos")
    public Page<TarifAuto> getAllTarifAuto(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @RequestParam(required = false) String searchTerm,
                                           @RequestParam(required = false) String currentLanguage) {
        Pageable pageable = PageRequest.of(page, size);
        return tarifAutoService.findAllTarifAutoByLocal(searchTerm, currentLanguage, pageable);
    }
    @GetMapping("/{id}")
        public ResponseEntity<TarifAuto> getTarifAutoById(@PathVariable Long id) {
            try {
                TarifAuto tarifAuto = tarifAutoService.getTarifAutoById(id);
                return ResponseEntity.ok(tarifAuto);
            } catch (TarifAutoNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.status(500).build();
            }
        }

    @PutMapping("/{id}")
    public ResponseEntity<TarifAuto> updateTarifAuto(@PathVariable Long id,
                                                     @RequestBody TarifAuto tarifAutoDetails) {
        TarifAuto updatedTarifAuto = tarifAutoService.updateTarifAuto(id, tarifAutoDetails);
        return ResponseEntity.ok(updatedTarifAuto);
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteTarifAuto(@PathVariable(value = "id") Long tarifAutoId)
            throws ResourceNotFoundException {
        return tarifAutoService.deleteTarifAuto(tarifAutoId);
    }
}