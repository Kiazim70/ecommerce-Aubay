package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.dtos.CategoryCarDto;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.models.Product;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.repository.CategoryCarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryCarService {

    @Autowired
    private CategoryCarRepository categoryCarRepository;

    public CategoryCar add(CategoryCar categoryCar) {
        return categoryCarRepository.save(categoryCar);
    }

    public Optional<CategoryCar> getCategoryCarById(Long categoryCarId) {
        return categoryCarRepository.findById(categoryCarId);
    }

    @Transactional
    public List<CategoryCar> getCategoryCarByLocales(String currentLanguage) {
        List<CategoryCar> list = categoryCarRepository.findCategoryCarsByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(CategoryCar::getNameCat))
                //.filter(x -> productRepository.existsById(x.getId()))
                //.filter(x -> x.getLocale().equals("de"))
                .collect(Collectors.toList());
    }

    public Page<CategoryCar> findAllPaged(Pageable pageable) {
       return categoryCarRepository.findAll(pageable);
    }

    public void saveImage(MultipartFile image) {
        try {
            CategoryCar category = new CategoryCar();
            category.setImage(image.getBytes()); // Convertir l'image en tableau d'octets
            categoryCarRepository.save(category); // Enregistrer la catégorie avec l'image dans la base de données
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
        }
    }

    public CategoryCar addCategoryWithImage(Long id, String locale, String name, byte[] imageRow) {
        // Créer un nouvel objet ProductCar avec les données fournies
        CategoryCar category = new CategoryCar();
        category.setId(Math.toIntExact(id));
        category.setLocale(locale);
        category.setNameCat(name);
        category.setImage(imageRow); // Définir le chemin de l'image

        // Enregistrer le produit dans la base de données
        return categoryCarRepository.save(category);
    }

    public CategoryCar updateCategory(Long id, String locale, String nameCat, byte[] imageData) {
        CategoryCar categoryToUpdate = categoryCarRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found with id: " + id));

        // Mettez à jour les champs du produit avec les nouvelles valeurs
        categoryToUpdate.setLocale(locale);
        categoryToUpdate.setNameCat(nameCat);
        categoryToUpdate.setImage(imageData);

        // Enregistrez le produit misà jour dans la base de données
        return categoryCarRepository.save(categoryToUpdate);
    }

    public Map<String, Boolean> deleteCategoryCar(Long id) {
        CategoryCar category = categoryCarRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("categoryCar not found for this id :: " + id));

        categoryCarRepository.delete(category);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
