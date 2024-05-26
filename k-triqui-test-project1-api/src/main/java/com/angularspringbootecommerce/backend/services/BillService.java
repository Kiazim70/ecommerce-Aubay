package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Bill;
import com.angularspringbootecommerce.backend.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BillService {

    private static BillRepository billRepository;

    public static List<Bill> getBillByLocales(String currentLanguage) {
        List<Bill> list = billRepository.findBillsByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(Bill::getBillingDate))
                .collect(Collectors.toList());
    }

    public Optional<Bill> getBillById(Long billId) {
        return billRepository.findById(billId);
    }

//    public List<Bill> searchBills(String query) {
//        List<Bill> bills = billRepository.searchBill(query);
//        return bills;
//    }

    public Bill updateBills(long billId, Bill bill) {
        Bill bi = billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("bill not found for this id :: " + billId));


        return billRepository.save(bill);
    }

    public Map<String, Boolean> deleteBill(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("bill not found for this id :: " + billId));

        billRepository.delete(bill);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Bill add(Bill bill) {

        Bill bil = new Bill();
        bil.getId();
        bil.getBillingDate();
        bil.getLocale();
        bil.getCustomers();
        bil.getConcessionnaire();
        bil.getProductCars();

        return billRepository.save(bil);

    }


//    public Page<Bill> getbills(String currentLanguage, PageRequest pageable, String query) {
//        if (query != null && !query.isEmpty()) {
//            // Si un terme de recherche est fourni, utiliser la méthode de recherche appropriée de votre repository
//            return billRepository.findByBillAndLocale(currentLanguage, pageable, query);
//        } else {
//            // Sinon, récupérer tous les clients paginés
//            return billRepository.findAll(pageable);
//        }
//    }
}
