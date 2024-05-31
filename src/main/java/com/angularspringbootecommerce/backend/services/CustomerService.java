package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class CustomerService {


    private final CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer add(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public List<Customer> searchCustomers(String query) {
        List<Customer> customers = customerRepository.searchCustomer(query);
        return customers;
    }

    public Customer updateCustomers(long customerId, Customer customer) {
        Customer cust = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("customer not found for this id :: " + customerId));

        customer.setId(customer.getId());
        customer.setLastname(customer.getLastname());
        customer.setFirstname(customer.getFirstname());
        customer.setEmail(customer.getEmail());
        customer.setPhone(customer.getPhone());
        return customerRepository.save(customer);
    }

    public Map<String, Boolean> deleteCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("customer not found for this id :: " + customerId));

        customerRepository.delete(customer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Page<Customer> getCustomers(String searchTerm, Pageable pageable) {
        if (searchTerm != null && !searchTerm.isEmpty()) {
            // Si un terme de recherche est fourni, utiliser la méthode de recherche appropriée de votre repository
            return customerRepository.findByCustomer(searchTerm, (PageRequest) pageable);
        } else {
            // Sinon, récupérer tous les clients paginés
            return customerRepository.findAll(pageable);
        }
    }
    }


//    public Page<Customer> getCustomers(PageRequest pageRequest) {
//        return customerRepository.findAll(pageRequest);
//    }

