package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.repository.ProductCarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductCarService {

    @Autowired
    private final ProductCarRepository productCarRepository;
    private MultipartFile image ;

    @Transactional
    public List<ProductCar> getProductsCarByLocales(String currentLanguage) {
        List<ProductCar> list = productCarRepository.findProductCarsByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(ProductCar::getName))
                //.filter(x -> productRepository.existsById(x.getId()))
                //.filter(x -> x.getLocale().equals("de"))
                .collect(Collectors.toList());
    }


    public Optional<ProductCar> getProductCarById(Long productCarId) {
        return productCarRepository.findById(productCarId);
    }

    public ProductCar add(ProductCar productCar) {
        return productCarRepository.save(productCar);
    }

    public List<ProductCar> searchProductCars(String query) {
        List<ProductCar> productCars = productCarRepository.searchProductCar(query);
        return productCars;
    }

//    public ProductCar updateProductCars(long producCartId, ProductCar productCar, String currentLanguage) {
//        ProductCar prodCar = productCarRepository.findById(producCartId)
//                .orElseThrow(() -> new ResourceNotFoundException("producCart not found for this id :: " + producCartId));
//
//        productCar = new ProductCar();
//        productCar.setId(prodCar.getId());
//        productCar.setLocale(prodCar.getLocale());
//        productCar.setCategoryCar(prodCar.getCategoryCar());
//        productCar.setName(prodCar.getName());
//        productCar.setDescription(prodCar.getDescription());
//        productCar.setPrice(prodCar.getPrice());
//        productCar.setImage(prodCar.getImage());
//        productCarRepository.save(productCar);
//        return productCar;
//    }

    public Map<String, Boolean> deleteProductCar(Long productCarId) {
        ProductCar productCar = productCarRepository.findById(productCarId)
                .orElseThrow(() -> new ResourceNotFoundException("productCar not found for this id :: " + productCarId));

        productCarRepository.delete(productCar);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

  

    //    public List<ProductCar> getCarsByCategoryId(int categoryId, int pageIndex, int pageSize, String currentLanguage) {
//        // Implémentez la logique pour récupérer les voitures par catégorie en fonction de la langue actuelle
//        return productCarRepository.findCarsByCategoryIdAndLanguage(categoryId, currentLanguage, pageIndex, pageSize);
//    }

    @Transactional
    public List<ProductCar> searchCars(String query, String currentLanguage) {
        // Implémentez la logique pour rechercher des voitures en fonction de la langue actuelle
        return productCarRepository.searchCarsByQueryAndLanguage(query, currentLanguage);
    }

//    @Transactional
//    public List<ProductCar> getCarsByCategoryId(int id, PageRequest pageable, Integer category_car_id, String currentLanguage) {
//        return productCarRepository.findCarsByCategoryIdAndLanguage(id, pageable, category_car_id, currentLanguage);
//    }

    public Optional<ProductCar> findById(Long imageId) {
        return productCarRepository.findById(imageId);
    }

    public ProductCar addCarWithImage(Long id, String locale, Long categoryId, String name, String description, BigDecimal price, byte[] imageRow) {
        // Créer un nouvel objet ProductCar avec les données fournies
        ProductCar productCar = new ProductCar();
        productCar.setId(id);
        productCar.setLocale(locale);
        productCar.setCategoryCarId(categoryId);
        productCar.setName(name);
        productCar.setDescription(description);
        productCar.setPrice(price);
        productCar.setImage(imageRow); // Définir le chemin de l'image

        // Enregistrer le produit dans la base de données
        return productCarRepository.save(productCar);
    }


    public ProductCar updateProductCars(Long id, String locale, Long categoryId, String name, String description, BigDecimal price, byte[] imageData) throws IOException {
        // Récupérez le produit de voiture à mettre à jour en fonction de son ID
        ProductCar carToUpdate = productCarRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Car not found with id: " + id));



        // Mettez à jour les champs du produit avec les nouvelles valeurs
        carToUpdate.setLocale(locale);
        carToUpdate.setCategoryCarId(categoryId);
        carToUpdate.setName(name);
        carToUpdate.setDescription(description);
        carToUpdate.setPrice(price);
        carToUpdate.setImage(imageData);

        // Enregistrez le produit misà jour dans la base de données
        return productCarRepository.save(carToUpdate);
        }

//    public Page<ProductCar> getProductCars(PageRequest pageable, Integer categoryCarId, String locale) {
//        if (categoryCarId != null && locale != null && !locale.isEmpty()) {
//            // If both productCar and locale are provided, filter by both
//            return productCarRepository.findByCategoryCarIdAndLocale(categoryCarId, locale, pageable);
//        } else if (categoryCarId != null) {
//            // If only productCar is provided, filter by productCar
//            return productCarRepository.findByCategoryCarId(categoryCarId, pageable);
//        } else if (locale != null && !locale.isEmpty()) {
//            // If only locale is provided, filter by locale
//            return productCarRepository.findByLocale(locale, pageable);
//        } else {
//            // Otherwise, return all product cars
//            return productCarRepository.findAll(pageable);
//        }
//    }

    @Transactional
    public Page<ProductCar> findCarsByCategoryIdAndLanguage(int category_car_id, String currentLanguage, String searchTerm, Pageable pageable) {
        return productCarRepository.findCarsByCategoryIdAndLanguage(category_car_id, searchTerm, currentLanguage, pageable);
    }


    @Transactional
    public Page<ProductCar> findByCategoryId(Long category_car_id, String currentLanguage, Pageable pageable) {
       return productCarRepository.findByCategoryId(category_car_id, currentLanguage, pageable);

    }

        @Transactional
        public Page<ProductCar> findAllCars(String searchTerm, String currentLanguage, Pageable pageable) {
            // Implémente la logique pour récupérer les voitures de produit avec les paramètres donnés
            // Exemple :
            return productCarRepository.findAllByLocaleAndNameContaining(currentLanguage, searchTerm, pageable);
        }

        @Transactional
        public List<ProductCar> getsearchByCar(Long id) {
            // Exemple : recherche des produits liés à la voiture avec l'ID spécifié
            List<ProductCar> car = productCarRepository.findByCarId(id);
            return car;
        }
}


//    public String storeFile(MultipartFile file) {
//        return productCarRepository.storeFile(file);
//    }

//    public Page<ProductCar> getProductCarsByCategoryCarIdAndSearch(PageRequest pageable, String query, String categoryCarId, String currentLanguage) {
//        if (currentLanguage != null && !currentLanguage.isEmpty()) {
//            // Si la langue est spécifiée, utilisez une méthode spécifique prenant en charge la langue
//            if (query == null || query.isEmpty()) {
//                return productCarRepository.findByCategoryCarIdAndLanguage(categoryCarId, currentLanguage, pageable);
//            } else {
//                return productCarRepository.findByCategoryCarIdAndNameContainingAndLanguage(categoryCarId, query, currentLanguage, pageable);
//            }
//        } else {
//            // Si aucune langue n'est spécifiée, utilisez la méthode précédente sans prendre en charge la langue
//            if (query == null || query.isEmpty()) {
//                return productCarRepository.findByCategoryCarId(categoryCarId, pageable);
//            } else {
//                return productCarRepository.findByCategoryCarIdAndNameContainingIgnoreCase(categoryCarId, query, pageable);
//            }
//        }
//    }


