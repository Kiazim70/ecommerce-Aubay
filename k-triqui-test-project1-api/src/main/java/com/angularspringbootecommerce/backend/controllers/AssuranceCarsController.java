package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.models.AssuranceCars;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.services.AssuranceCarsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/assurancecars")
public class AssuranceCarsController {


    private final AssuranceCarsService assuranceCarsService;

    @GetMapping("all")
    public List<AssuranceCars> getAssuranceCarByLocales(@RequestParam String currentLanguage) {

        System.out.println(currentLanguage);
        //return productService.getAllProducts();
        return assuranceCarsService.getAssuranceCarsByLocales(currentLanguage);

    }

    @PostMapping("/addAssuranceCarsImg")
    public ResponseEntity<?> addAssuranceCarWithImage(@RequestParam("image") MultipartFile image,
                                             @RequestParam("id") Long id,
                                             @RequestParam("locale") String locale,
                                             @RequestParam("name") String name) {
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
            AssuranceCars assuranceCars = assuranceCarsService.addAssuranceCarsWithImage(id, locale, name, image.getBytes());

            // Retourner la réponse avec la voiture ajoutée
            return ResponseEntity.ok(assuranceCars);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }
    private String saveImage(MultipartFile image) throws IOException {
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


}
