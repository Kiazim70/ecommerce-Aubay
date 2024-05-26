package com.angularspringbootecommerce.backend.controllers;

import com.angularspringbootecommerce.backend.dtos.ProductDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.Customer;
import com.angularspringbootecommerce.backend.models.Product;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.services.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLOutput;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/addProductImg")
    public ResponseEntity<?> addCarWithImage(@RequestParam("image") MultipartFile image,
                                             @RequestParam("id") Long id,
                                             @RequestParam("locale") String locale,
                                             @RequestParam("category_id") Long categoryId,
                                             @RequestParam("name") String name,
                                             @RequestParam("description") String description,
                                             @RequestParam("price") BigDecimal price) {
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
            Product addedProdct = productService.addProductWithImage(id, locale, categoryId, name, description, price, image.getBytes());

            // Retourner la réponse avec la voiture ajoutée
            return ResponseEntity.ok(addedProdct);
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
//    @GetMapping("all")
//    public List<Product> getProductsByLocales(@RequestParam String currentLanguage) {
//
//        System.out.println(currentLanguage);
//        //return productService.getAllProducts();
//        return productService.getProductsByLocales(currentLanguage);
//
//    }


    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        Optional<Product> productOptional = productService.getProductById(productId);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return ResponseEntity.ok(product);
        } else {
            throw new AppException("Product not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable("id") Long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam("locale") String locale,
            @RequestParam("category_id") Long categoryId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price) throws IOException {

        try {
            // Exemple de traitement de l'image :
            byte[] imageData = image.getBytes();
            //productCar.setImage(imageData);

            Product updatedProduct = productService.updateProducts(id, locale, categoryId, name, description, price, imageData);
            // Simuler la mise à jour réussie en renvoyant le produit mis à jour
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }



    @GetMapping("/search")
    ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query) {
        return ResponseEntity.ok(productService.searchProducts(query));
    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Product> updateProduct(@PathVariable("id") long productId, @Valid @RequestBody Product product) {
//        return ResponseEntity.ok(productService.updateProducts(productId, product));
//    }
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Long productId)
            throws ResourceNotFoundException {
        return productService.deleteProduct(productId);
    }
//    @GetMapping("allProducts")
//    public Page<Product> getProducts(@RequestParam(value = "category_id") Long category_id,
//            @RequestParam(required = false) String currentLanguage,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(required = false) String searchTerm) {
//        // Créer une requête de pagination
//        PageRequest pageable = PageRequest.of(page, size);
//
//        // Appeler le service pour récupérer les clients en fonction de la pagination et de la recherche
//        return productService.getProducts(category_id, currentLanguage, searchTerm, pageable);
//    }
    @GetMapping("/{categoryId}/products")
    public Page<Product> getProductsByCategory(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size,
                                               @RequestParam(required = false) String query,
                                               @RequestParam(required = false) String categoryId,
                                               @RequestParam String currentLanguage) {
        // Créer une requête de pagination
        PageRequest pageable = PageRequest.of(page, size);

        return productService.getProductsByCategoryIdAndSearch(pageable, query, categoryId, currentLanguage);
    }
    @GetMapping("all")
    public Page<Product> productsByCategorie(
                                     @RequestParam(required = false) String currentLanguage,
                                     @RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size,
                                     @RequestParam(required = false) String searchTerm) {
        // Créer une requête de pagination
        PageRequest pageable = PageRequest.of(page, size);

        // Appeler le service pour récupérer les clients en fonction de la pagination et de la recherche
        return productService.getProductsByCategorie(currentLanguage, searchTerm, pageable);
    }
}