package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Brand;
import com.angularspringbootecommerce.backend.models.Model;
import com.angularspringbootecommerce.backend.repository.ModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ModelService {

    private final ModelRepository modelRepository;

    public Map<String, Boolean> deleteModel(Long id) {
        Model model = modelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("model not found for this id :: " + id));

        modelRepository.delete(model);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Model addModelWithImage(Long id, String locale, String modelname, String city, String country, String zipcode, Brand brand_id, byte[] image, Double price, String description) {
        Model model = new Model();
        model.setId(id);
        model.setLocale(locale);
        model.setCountry(country);
        model.setPrice(price);
        model.setZipcode(zipcode);
        model.setCity(city);
        model.setBrand(brand_id);
        model.setDescription(description);
        model.setModelname(modelname);
        model.setImage(image); // Définir le chemin de l'image

        // Enregistrer le produit dans la base de données
        return modelRepository.save(model);
    }

@Transactional
    public Page<Model> findAllModel(String searchTerm, String currentLanguage, Pageable pageable) {
        return modelRepository.findAllByLocaleAndNameContaining(currentLanguage, searchTerm, pageable);

    }

    public Model updateModel(Long id, String locale, String modelname, String description, Double price, Brand brand_id, String city, String country, String zipcode, byte[] imageData) {
        Model modelToUpdate = modelRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("model not found with id: " + id));

        // Mettez à jour les champs du produit avec les nouvelles valeurs
        modelToUpdate.setId(id);
        modelToUpdate.setLocale(locale);
        modelToUpdate.setModelname(modelname);
        modelToUpdate.setDescription(description);
        modelToUpdate.setPrice(price);
        modelToUpdate.setBrand(brand_id);
        modelToUpdate.setCity(city);
        modelToUpdate.setCountry(country);
        modelToUpdate.setZipcode(zipcode);
        modelToUpdate.setImage(imageData);

        // Enregistrez le produit misà jour dans la base de données
        return modelRepository.save(modelToUpdate);
    }

@Transactional
    public Page<Model> findModelsByBrandIdAndLanguage(int brand_id, String searchTerm, String currentLanguage, Pageable pageable) {
        return modelRepository.findModelsByBrandIdAndLanguage(brand_id, searchTerm, currentLanguage, pageable);

    }
@Transactional
    public Optional<Model> getsearchByModel(Long id) {
        Optional<Model> model = modelRepository.findByModelId(id);
        return model;
    }

@Transactional
    public Optional<Model> getModelById(Long modelId) {
       return modelRepository.findByModelId(modelId);
    }
//    @Transactional
//    public Optional<Model> getModelByIdAndLanguage(Long id, String currentLanguage) {
//     return modelRepository.findByIdAndLanguage(id, currentLanguage);
//    }
}


