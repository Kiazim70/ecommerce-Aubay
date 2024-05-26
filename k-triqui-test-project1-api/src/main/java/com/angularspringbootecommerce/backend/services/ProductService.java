package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Product;
import com.angularspringbootecommerce.backend.repository.CategoryRepository;
import com.angularspringbootecommerce.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;
    Locale locale = LocaleContextHolder.getLocale();

    public List<Product> getProductsByLocales(String currentLanguage) {
     List<Product> list = productRepository.findProductsByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(Product::getName))
                //.filter(x -> productRepository.existsById(x.getId()))
                //.filter(x -> x.getLocale().equals("de"))
                .collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public Product add(Product product) {
        return productRepository.save(product);
    }

    public List<Product> searchProducts(String query) {
        List<Product> products = productRepository.searchProduct(query);
        return products;
    }


    public Map<String, Boolean> deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("product not found for this id :: " + productId));

        productRepository.delete(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


    public List<Product> getAllProducts() {
        List<Product> list = productRepository.findAll();
     return list.stream()
             .sorted(Comparator.comparing(Product::getName))
             //.filter(x -> productRepository.existsById(x.getId()))
             //.filter(x -> x.getLocale().equals("de"))
             .collect(Collectors.toList());
    }

//    public Page<Product> getProducts(String currentLanguage, PageRequest pageable, String query, String category_id) {
//        if (query != null && !query.isEmpty()) {
//            // Si un terme de recherche est fourni, utiliser la méthode de recherche appropriée de votre repository
//            return productRepository.findByProductAndLocale(currentLanguage, query, category_id, pageable);
//        } else {
//            // Sinon, récupérer tous les clients paginés
//            return productRepository.findAll(pageable);
//        }
//    }

//    public List<Product> getProductsByCategoryId(Long categoryId) {
//        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
//
//        if (categoryOptional.isPresent()) {
//            return productRepository.findByCategoryId(categoryId);
//        } else {
//            throw new AppException("Category not found.", HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
//        }
//    }

    public Page<Product> getProductsByCategoryIdAndSearch(PageRequest pageable, String query, String categoryId, String currentLanguage) {
        if (currentLanguage != null && !currentLanguage.isEmpty()) {
            // Si la langue est spécifiée, utilisez une méthode spécifique prenant en charge la langue
            if (query == null || query.isEmpty()) {
                return productRepository.findByCategoryIdAndLanguage(categoryId, currentLanguage, pageable);
            } else {
                return productRepository.findByCategoryIdAndNameContainingAndLanguage(categoryId, query, currentLanguage, pageable);
            }
        } else {
            // Si aucune langue n'est spécifiée, utilisez la méthode précédente sans prendre en charge la langue
            if (query == null || query.isEmpty()) {
                return productRepository.findByCategoryId(categoryId, pageable);
            } else {
                return productRepository.findByCategoryIdAndNameContainingIgnoreCase(categoryId, query, pageable);
            }
        }
    }
    @Transactional
    public Page<Product> getProducts(Long category_id, String currentLanguage, String searchTerm, PageRequest pageable) {
        return productRepository.findAllByLocaleAndCategoryAndNameContaining(category_id, currentLanguage, searchTerm, pageable);
    }

    @Transactional
    public Product addProductWithImage(Long id, String locale, Long categoryId, String name, String description, BigDecimal price, byte[] imageRow) {
        Product product = new Product();
        product.setId(id);
        product.setLocale(locale);
        product.setCategoryId(categoryId);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImage(imageRow); // Définir le chemin de l'image

        // Enregistrer le produit dans la base de données
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProducts(Long id, String locale, Long categoryId, String name, String description, BigDecimal price, byte[] imageData) {
        Product prod = productRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("product not found for this id :: " + categoryId));

        Product product = new Product();
        product.setId(prod.getId());
        product.setCategory(prod.getCategory());
        product.setName(prod.getName());
        product.setDescription(prod.getDescription());
        product.setPrice(prod.getPrice());
        product.setImage(prod.getImage());
        productRepository.save(product);
        return product;
    }

    @Transactional
    public Page<Product> getProductsByCategorie(String currentLanguage, String searchTerm, PageRequest pageable) {
        return productRepository.findAllByLocaleAndNameContaining(currentLanguage, searchTerm, pageable);

    }
}


