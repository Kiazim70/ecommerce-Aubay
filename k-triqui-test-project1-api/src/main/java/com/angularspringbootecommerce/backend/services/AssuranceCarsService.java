package com.angularspringbootecommerce.backend.services;


import com.angularspringbootecommerce.backend.models.AssuranceCars;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.repository.AsuranceCarsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AssuranceCarsService {
    @Autowired
    private AsuranceCarsRepository assuranceCarsRepository;


    public AssuranceCars addAssuranceCarsWithImage(Long id, String locale, String name, byte[] imageRow) {
            // Créer un nouvel objet AssuranceCars
            AssuranceCars assuranceCars = new AssuranceCars();
            assuranceCars.setId(id);
            assuranceCars.setLocale(locale);
            assuranceCars.setName(name);
            assuranceCars.setImage(imageRow);

            // Enregistrer l'objet dans la base de données
            return assuranceCarsRepository.save(assuranceCars);
        }

        @Transactional
    public List<AssuranceCars> getAssuranceCarsByLocales(String currentLanguage) {
        List<AssuranceCars> list = assuranceCarsRepository.findAssuranceCarsByLocales(currentLanguage);
        return list.stream()
                .sorted(Comparator.comparing(AssuranceCars::getName))
                //.filter(x -> productRepository.existsById(x.getId()))
                //.filter(x -> x.getLocale().equals("de"))
                .collect(Collectors.toList());
    }
}
