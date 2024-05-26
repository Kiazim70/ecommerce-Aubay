package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.dtos.CategoryCarDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Brand;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.repository.BrandRepository;
import com.angularspringbootecommerce.backend.services.BrandService;
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
@RequestMapping("/api/v1/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;

    private Brand brand;
    private BrandRepository brandRepository;

    public void Brand(BrandService brandService) {
        this.brandService = brandService;
    }



    @PostMapping("/addBrands")
    public ResponseEntity<?> addCategory(@RequestParam("image") MultipartFile image,
                                         @RequestParam("id") Long id,
                                         @RequestParam("locale") String locale,
                                         @RequestParam("brandname") String brandname) {
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
            Brand addedBrand = brandService.addBrandWithImage(id, locale, brandname, image.getBytes());

            // Retourner la réponse avec la voiture ajoutée
            return ResponseEntity.ok(addedBrand);
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
//    @PostMapping
//    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
//        try {
//            categoryCarService.saveImage(image); // Appel au service pour enregistrer l'image
//            return ResponseEntity.ok("Image uploaded successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image: " + e.getMessage());
//        }
//    }

//    @PostMapping("/add")
//    public CategoryCar add(@RequestBody CategoryCarDto categoryCarDto) {
//        if (
//                categoryCarDto.getLocale() == null || categoryCarDto.getLocale().isEmpty() ||
//                        categoryCarDto.getNameCat() == null || categoryCarDto.getNameCat().isEmpty() ||
//                        categoryCarDto.getImage() == null || categoryCarDto.getImage().isEmpty()) {
//
//            throw new AppException("All fields are required.", HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
//        }
//        CategoryCar categoryCar = new CategoryCar();
//        categoryCar.setLocale(categoryCarDto.getLocale());
//        categoryCar.setNameCat(categoryCarDto.getNameCat());
//        categoryCar.setImage(categoryCarDto.getImage().getBytes());
//
//        return categoryCarService.add(categoryCar);
//    }

    @GetMapping("/brandes/{id}")
    public Optional<Brand> getBrandById(@PathVariable(value = "id") Long brandId) {
        return brandService.getBrandById(brandId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Brand>> getAllBrands(String currentLanguage) {
        List<Brand> brand = brandService.getBrandByLocales(currentLanguage);
        return new ResponseEntity<>(brand, HttpStatus.OK);
    }

//    @GetMapping("/pageable")
//    public ResponseEntity<Page<CategoryCar>> findAllPaged(
//            Pageable pageable) {
//        return ResponseEntity.ok()
//                .body(categoryCarService.findAllPaged(pageable));
//    }
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteBrand(@PathVariable(value = "id") Long id)
            throws ResourceNotFoundException {
        return brandService.deleteBrand(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand (
            @PathVariable("id") Long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam("locale") String locale,
            @RequestParam("brandname") String brandname) throws IOException {

        try {
            // Exemple de traitement de l'image :
            byte[] imageData = image.getBytes();
            //categoryCar.setImage(imageData);

            Brand updatedBrand = brandService.updateBrand(id, locale, brandname, imageData);
            // Simuler la mise à jour réussie en renvoyant le produit mis à jour
            return ResponseEntity.ok(updatedBrand);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }
}


