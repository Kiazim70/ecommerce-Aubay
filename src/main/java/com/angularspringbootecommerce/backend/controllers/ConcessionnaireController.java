package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.ConcessionnaireDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Concessionnaire;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.services.ConcessionnaireService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/concessionnaires")
public class ConcessionnaireController {

    private final ConcessionnaireService concessionnaireService;

    @GetMapping("/all")
    public Page<Concessionnaire> getConcessionnaires(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm) {
        // Créer une requête de pagination
        PageRequest pageable = PageRequest.of(page, size);

        // Appeler le service pour recuperate les clients en fonction de la pagination et de la recherche
        return concessionnaireService.getConcessionnaires(pageable, searchTerm);
    }
    @GetMapping("allCon")
    public List<Concessionnaire> getConcessionnaire() {

        System.out.println();
        //return productService.getAllProducts();
        return concessionnaireService.getAllConcessionnaire();

    }

    @PostMapping("/add")
    public Concessionnaire add(@RequestBody ConcessionnaireDto concessionnaireDto) {
        if (
                        concessionnaireDto.getNameCompagny() == null || concessionnaireDto.getNameCompagny().isEmpty() ||
                        concessionnaireDto.getEmail() == null || concessionnaireDto.getEmail().isEmpty() ||
                        concessionnaireDto.getPhone() == null  || concessionnaireDto.getPhone().isEmpty() ||
                        concessionnaireDto.getNsiret() == null || concessionnaireDto.getNsiret().isEmpty() ||
                        concessionnaireDto.getFax() == null  ||  concessionnaireDto.getFax().isEmpty() ||
                        concessionnaireDto.getAddress() == null || concessionnaireDto.getAddress().isEmpty() ||
                        concessionnaireDto.getZipcode() == null ||  concessionnaireDto.getZipcode().isEmpty() ||
                        concessionnaireDto.getCountry() == null || concessionnaireDto.getCountry().isEmpty()) {
            throw new AppException("All fields are required.", HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
        Concessionnaire concessionnaire = new Concessionnaire();
        concessionnaire.setNameCompagny(concessionnaireDto.getNameCompagny());
        concessionnaire.setNsiret(concessionnaireDto.getNsiret());
        concessionnaire.setEmail(concessionnaireDto.getEmail());
        concessionnaire.setPhone(concessionnaireDto.getPhone());
        concessionnaire.setFax(concessionnaireDto.getFax());
        concessionnaire.setAddress(concessionnaireDto.getAddress());
        concessionnaire.setZipcode(concessionnaireDto.getZipcode());
        concessionnaire.setCountry(concessionnaireDto.getCountry());
        return concessionnaireService.add(concessionnaire);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConcessionnaireById(@PathVariable Long id) {
        Optional<Concessionnaire> concessionnaireOptional = concessionnaireService.getConcessionnaireById(id);

        if (concessionnaireOptional.isPresent()) {
            Concessionnaire concessionnaire = concessionnaireOptional.get();
            return ResponseEntity.ok(concessionnaire);
        } else {
            throw new AppException("concessionnaire not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/search")
//    public ResponseEntity<List<Concessionnaire>> searchConcessionnaires(@RequestParam String query) {
//        List<Concessionnaire> Concessionnaires = concessionnaireService.searchConcessionnaires(query);
//        Concessionnaires.forEach(c -> System.out.println(new String(c.getNameCompagny())));
//        return ResponseEntity.ok(Concessionnaires);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Concessionnaire> updateConcessionnaire(@PathVariable("id") long concessionnaireId, @Valid @RequestBody Concessionnaire concessionnaire) {
        return ResponseEntity.ok(concessionnaireService.updateConcessionnaires(concessionnaireId, concessionnaire));
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteConcessionnaire(@PathVariable(value = "id") Long concessionnaireId)
            throws ResourceNotFoundException {
        return concessionnaireService.deleteConcessionnaire(concessionnaireId);
    }

}

