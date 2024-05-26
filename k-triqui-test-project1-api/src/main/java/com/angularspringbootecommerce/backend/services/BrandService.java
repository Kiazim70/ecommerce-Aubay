package com.angularspringbootecommerce.backend.services;


import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Brand;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.repository.BrandRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public Brand addBrandWithImage(Long id, String locale, String brandname, byte[] imageRow) {
        Brand brand = new Brand();
        brand.setId(id);
        brand.setLocale(locale);
        brand.setBrandname(brandname);
        brand.setImage(imageRow); // Définir le chemin de l'image

        // Enregistrer le produit dans la base de données
        return brandRepository.save(brand);
    }

    public Optional<Brand> getBrandById(Long brandId) {
        return brandRepository.findById(brandId);
    }

    @Transactional
    public List<Brand> getBrandByLocales(String currentLanguage) {
        List<Brand> list = brandRepository.findBrandByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(Brand::getBrandname))
                //.filter(x -> productRepository.existsById(x.getId()))
                //.filter(x -> x.getLocale().equals("de"))
                .collect(Collectors.toList());
    }

    public Map<String, Boolean> deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("brand not found for this id :: " + id));

        brandRepository.delete(brand);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public Brand updateBrand(Long id, String locale, String brandname, byte[] imageData) {
        Brand brandToUpdate = brandRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("brand not found with id: " + id));



        // Mettez à jour les champs du produit avec les nouvelles valeurs
        brandToUpdate.setLocale(locale);
        brandToUpdate.setBrandname(brandname);
        brandToUpdate.setImage(imageData);

        // Enregistrez le produit misà jour dans la base de données
        return brandRepository.save(brandToUpdate);
    }
}
