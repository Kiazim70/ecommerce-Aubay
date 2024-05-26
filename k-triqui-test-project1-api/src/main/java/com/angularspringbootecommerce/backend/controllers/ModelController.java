package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Brand;
import com.angularspringbootecommerce.backend.models.Model;
import com.angularspringbootecommerce.backend.services.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/models")
public class ModelController {


    private final ModelService modelService;


    @PostMapping("/addModels")
    public ResponseEntity<?> addCategory(@RequestParam("image") MultipartFile image,
                                         @RequestParam("id") Long id,
                                         @RequestParam("locale") String locale,
                                         @RequestParam("modelname") String modelname,
                                         @RequestParam("description") String description,
                                         @RequestParam("price") Double price,
                                         @RequestParam("brand_id") Brand brand_id,
                                         @RequestParam("city") String city,
                                         @RequestParam("country") String country,
                                         @RequestParam("zipcode") String zipcode) {
        try {
            System.out.println(image.getOriginalFilename());
            System.out.println(image.getSize());
            System.out.println(image.getBytes().length);
            System.out.println(new String(image.getBytes()));
            // Vérifier si le fichier image est vide
            if (image.isEmpty()) {
                return ResponseEntity.badRequest().body("Image file is required");
            }

            // Enregistrer l'image et obtenir son chemin
            String imagePath = saveImage(image);


            // Ajouter la marque avec l'image
            Model addedModel = modelService.addModelWithImage(id, locale, modelname, city, country, zipcode, brand_id, image.getBytes(),price, description );

            // Retourner la réponse avec la voiture ajoutée
            return ResponseEntity.ok(addedModel);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }

    private String saveImage(MultipartFile image) {
        // Générer un nom de fichier unique
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();

        // Chemin où enregistrer l'image - ajustez-le selon vos besoins
        String uploadDir = "/src/main/java/images";

        // Créer le répertoire de téléchargement s'il n'existe pas
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
            // Chemin complet du fichier
        }

        String filePath = uploadDir + File.separator + fileName;

        // Créer un flux de sortie pour écrire le fichier
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            // Écrire les données du fichier dans le flux de sortie
            fos.write(image.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // Retourner le chemin du fichier enregistré
        return filePath;
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteModel(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        return modelService.deleteModel(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand (
            @RequestParam("image") MultipartFile image,
            @RequestParam("id") Long id,
            @RequestParam("locale") String locale,
            @RequestParam("modelname") String modelname,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("brand_id") Brand brand_id,
            @RequestParam("city") String city,
            @RequestParam("country") String country,
            @RequestParam("zipcode") String zipcode) {

        try {
            // Exemple de traitement de l'image :
            byte[] imageData = image.getBytes();
            //categoryCar.setImage(imageData);

            Model updatedModel = modelService.updateModel(id, locale, modelname, description, price, brand_id, city, country, zipcode, imageData);
            // Simuler la mise à jour réussie en renvoyant le produit mis à jour
            return ResponseEntity.ok(updatedModel);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }
    @GetMapping("/allModels")
    public Page<Model> getModels(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size,
                                               @RequestParam(required = false) String searchTerm,
                                               @RequestParam(required = false) String currentLanguage) {
        Pageable pageable = PageRequest.of(page, size);
        return modelService.findAllModel(searchTerm, currentLanguage, pageable);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<?> getModelByIdAndLanguage(@PathVariable Long id,
//                                                     @RequestParam(required = false) String currentLanguage) {
//        Optional<Model> modelOptional = modelService.getModelByIdAndLanguage(id, currentLanguage);
//
//        if (modelOptional.isPresent()) {
//            Model model = modelOptional.get();
//            return ResponseEntity.ok(model);
//        } else {
//            throw new AppException("Model not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
//        }
//    }
//
    @GetMapping("/{modelId}")
    public ResponseEntity<?> getModelById(@PathVariable Long modelId) {
        Optional<Model> modelOptional = modelService.getModelById(modelId);

        if (modelOptional.isPresent()) {
            Model model = modelOptional.get();
            return ResponseEntity.ok(model);
        } else {
            throw new AppException("Model not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/modelux")
    public Page<Model> getModelsByBrandId(@RequestParam(value = "brand_id") Long brand_id,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size,
                                                @RequestParam(required = false) String searchTerm,
                                                @RequestParam(required = false) String currentLanguage) {

        Pageable pageable = PageRequest.of(page, size);

        return modelService.findModelsByBrandIdAndLanguage(Math.toIntExact(brand_id), searchTerm, currentLanguage, pageable);
    }
    @GetMapping("/{id}/searchByModel")
    public ResponseEntity<Optional<Model>> searchByModel(@RequestParam Long id
    ) {
        Optional<Model> models = modelService.getsearchByModel(id);
//        cars.forEach(c -> System.out.println(new String(c.getImage())));
        return ResponseEntity.ok(models);
    }
}






