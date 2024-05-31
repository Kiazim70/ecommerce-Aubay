package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.CustomerDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.services.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/all")
    public Page<Customer> getCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchTerm) {
        // Créer une requête de pagination
        Pageable pageable = PageRequest.of(page, size);

        // Appeler le service pour récupérer les clients en fonction de la pagination et de la recherche
        return customerService.getCustomers(searchTerm, pageable);
    }
//    PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
//    Page<Customer> customersPage = customerService.getCustomers(pageRequest);


    @PostMapping("/add")
    public Customer add(@RequestBody CustomerDto customerDto) {
        if (
                customerDto.getLastname() == null ||
                        customerDto.getLastname().isEmpty() ||
                        customerDto.getFirstname() == null || customerDto.getFirstname().isEmpty() ||
                        customerDto.getEmail() == null || customerDto.getEmail().isEmpty() ||
                        customerDto.getPhone() == null  || customerDto.getPhone().isEmpty() ||
                        customerDto.getAdress() == null || customerDto.getAdress().isEmpty() ||
                        customerDto.getZipcode() == null || customerDto.getZipcode().isEmpty() ||
                        customerDto.getCountry() == null || customerDto.getCountry().isEmpty()) {
            throw new AppException("All fields are required.", HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
        Customer customer = new Customer();
        customer.setLastname(customerDto.getLastname());
        customer.setFirstname(customerDto.getFirstname());
        customer.setEmail(customerDto.getEmail());
        customer.setPhone(customerDto.getPhone());
        customer.setAdress(customerDto.getAdress());
        customer.setZipcode(customerDto.getZipcode());
        customer.setCountry(customerDto.getCountry());
        return customerService.add(customer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return ResponseEntity.ok(customer);
        } else {
            throw new AppException("customer not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long customerId, @Valid @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomers(customerId, customer));
    }
    @GetMapping("/search")
    ResponseEntity<List<Customer>> searchCustomers(@RequestParam("query") String query) {
        return ResponseEntity.ok(customerService.searchCustomers(query));
    }


    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteCustomer(@PathVariable(value = "id") Long customerId)
            throws ResourceNotFoundException {
        return customerService.deleteCustomer(customerId);
    }

}
