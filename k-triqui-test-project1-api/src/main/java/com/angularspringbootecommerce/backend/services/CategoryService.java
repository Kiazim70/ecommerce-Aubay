package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Category;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public Category addCategoryWithImage(Long id, String locale, String name, byte[] imageRow) {
        // Créer un nouvel objet ProductCar avec les données fournies
        Category category = new Category();
        category.setId(Math.toIntExact(id));
        category.setLocale(locale);
        category.setName(name);
        category.setImage(imageRow); // Définir le chemin de l'image

        // Enregistrer le produit dans la base de données
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryProductById(Long categoryId) {
        return categoryRepository.findById(categoryId);

    }

    public Map<String, Boolean> deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category not found for this id :: " + id));

        categoryRepository.delete(category);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Category updateCategory(Long id, String locale, String name, byte[] imageData) {
        Category categoryToUpdate = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found with id: " + id));



        // Mettez à jour les champs de la category avec les nouvelles valeurs
        categoryToUpdate.setLocale(locale);
        categoryToUpdate.setName(name);
        categoryToUpdate.setImage(imageData);

        // Enregistrez le produit misà jour dans la base de données
        return categoryRepository.save(categoryToUpdate);
    }
    @Transactional
    public List<Category> getCategoryProductsByLocales(String currentLanguage) {
        List<Category> list = categoryRepository.findCategoryProductsByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(Category::getName))
                //.filter(x -> productRepository.existsById(x.getId()))
                //.filter(x -> x.getLocale().equals("de"))
                .collect(Collectors.toList());
    }
    }

