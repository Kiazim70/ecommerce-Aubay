package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Category;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.services.CategoryCarService;
import com.angularspringbootecommerce.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    private Category category;

    public void Category(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/addCategorieImg")
    public ResponseEntity<?> addCategory(@RequestParam("image") MultipartFile image,
                                         @RequestParam("id") Long id,
                                         @RequestParam("locale") String locale,
                                         @RequestParam("name") String name ) {
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


            // Ajouter la voiture avec l'image
            Category addedCat = categoryService.addCategoryWithImage(id, locale, name, image.getBytes());

            // Retourner la réponse avec la voiture ajoutée
            return ResponseEntity.ok(addedCat);
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

    @GetMapping("/categoryId")
    public Optional<Category> getCategoriesProductById(@PathVariable(value = "id") Long categoryId) {
        return categoryService.getCategoryProductById(categoryId);
    }

//    @GetMapping("/all")
//    public ResponseEntity<List<CategoryCar>> getAllCategorieCars(String currentLanguage) {
//        List<CategoryCar> categorieCars = categoryCarService.getCategoryCarByLocales(currentLanguage);
//        return new ResponseEntity<>(categorieCars, HttpStatus.OK);
//    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategorieProducts(String currentLanguage) {
        List<Category> categories = categoryService.getCategoryProductsByLocales(currentLanguage);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteCategoryProduct(@PathVariable(value = "id") Long categoryId)
            throws ResourceNotFoundException {
        return categoryService.deleteCategory(categoryId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable("id") Long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam("locale") String locale,
            @RequestParam("name") String name) throws IOException {

        try {
            // Exemple de traitement de l'image :
            byte[] imageData = image.getBytes();
            //categoryCar.setImage(imageData);

            Category updatedCategory = categoryService.updateCategory(id, locale, name, imageData);
            // Simuler la mise à jour réussie en renvoyant le produit mis à jour
            return ResponseEntity.ok(updatedCategory);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }
}


