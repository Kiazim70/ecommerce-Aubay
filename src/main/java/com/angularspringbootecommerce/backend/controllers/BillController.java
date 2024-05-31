package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.BillDto;
import com.angularspringbootecommerce.backend.dtos.ProductDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Bill;
import com.angularspringbootecommerce.backend.models.Product;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.services.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/bills")
public class BillController {

    private BillService billService;

    @GetMapping("/all")
    public List<Bill> getBillByLocales(@RequestParam String currentLanguage) throws Exception {

            System.out.println(currentLanguage);
            return BillService.getBillByLocales(currentLanguage);

    }

    @PostMapping("/add")
    public ResponseEntity<Bill> add(@RequestBody Bill bill) {
        Bill newBill = billService.add(bill);
        // Retourner une réponse avec la nouvelle facture et le statut HTTP 201 (Créé)
        return ResponseEntity.status(HttpStatus.CREATED).body(bill);
    }

    @GetMapping("/{billId}")
    public ResponseEntity<?> getBillById(@PathVariable Long billId) {
        Optional<Bill> billOptional = billService.getBillById(billId);

        if (billOptional.isPresent()) {
            Bill bill = billOptional.get();
            return ResponseEntity.ok(bill);
        } else {
            throw new AppException("bill not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/search")
//    ResponseEntity<List<Bill>> searchBills(@RequestParam("query") String query) {
//        return ResponseEntity.ok(billService.searchBills(query));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(@PathVariable("id") long billId, @Valid @RequestBody Bill bill) {
        return ResponseEntity.ok(billService.updateBills(billId, bill));
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteBill(@PathVariable(value = "id") Long billId)
            throws ResourceNotFoundException {
        return billService.deleteBill(billId);
    }
//    @GetMapping("alls")
//    public Page<Bill> getBills(
//            @RequestParam(required = false) String currentLanguage,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(required = false) String query) {
//        // Créer une requête de pagination
//        PageRequest pageable = PageRequest.of(page, size);
//
//        // Appeler le service pour récupérer les clients en fonction de la pagination et de la recherche
//        return billService.getbills(currentLanguage, pageable, query);
//    }

}
