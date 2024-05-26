package com.angularspringbootecommerce.backend.controllers;


import com.angularspringbootecommerce.backend.dtos.ProductCarDto;
import com.angularspringbootecommerce.backend.exceptions.AppException;
import com.angularspringbootecommerce.backend.exceptions.ResourceNotFoundException;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.models.ProductCar;
import com.angularspringbootecommerce.backend.services.CategoryCarService;
import com.angularspringbootecommerce.backend.services.ProductCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/productcars")
public class ProductCarController {

    private final ProductCarService productCarService;

    @GetMapping("all")
    public List<ProductCar> getProductsByLocales(@RequestParam String currentLanguage) {

        System.out.println(currentLanguage);
        //return productService.getAllProducts();
        return productCarService.getProductsCarByLocales(currentLanguage);

    }

    @PostMapping("/addCarImg")
    public ResponseEntity<?> addCarWithImage(@RequestParam("image") MultipartFile image,
                                             @RequestParam("id") Long id,
                                             @RequestParam("locale") String locale,
                                             @RequestParam("category_car_id") Long categoryId,
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
            ProductCar addedCar = productCarService.addCarWithImage(id, locale, categoryId, name, description, price, image.getBytes());

            // Retourner la réponse avec la voiture ajoutée
            return ResponseEntity.ok(addedCar);
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



    @PostMapping("/add")
    public ProductCar add(@RequestBody ProductCarDto productCarDto) {
        if (
                productCarDto.getLocale() == null || productCarDto.getLocale().isEmpty() ||
                        //productCarDto.getCategory_car_id() == null || productCarDto.getCategory_car_id().isEmpty() ||
                        productCarDto.getName() == null || productCarDto.getName().isEmpty() ||
                productCarDto.getDescription() == null || productCarDto.getDescription().isEmpty() ||
                        productCarDto.getCategory_car_id() == null ||
                        productCarDto.getImage() == null || productCarDto.getImage().equals("") ||
                productCarDto.getPrice().compareTo(BigDecimal.ZERO) <= 0) {

            throw new AppException("All fields are required.", HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
        }
        ProductCar newProductCar = new ProductCar();
        newProductCar.setLocale(productCarDto.getLocale());
        newProductCar.setName(productCarDto.getName());
        newProductCar.setDescription(productCarDto.getDescription());
        newProductCar.setPrice(productCarDto.getPrice());
        newProductCar.setImage(productCarDto.getImage());
        return productCarService.add(newProductCar);
    }

    @GetMapping("/{productCarId}")
    public ResponseEntity<?> getProductCarById(@PathVariable Long productCarId) {
        Optional<ProductCar> productCarOptional = productCarService.getProductCarById(productCarId);

        if (productCarOptional.isPresent()) {
            ProductCar productCar = productCarOptional.get();
            return ResponseEntity.ok(productCar);
        } else {
            throw new AppException("ProductCar not found", HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/search")
//    ResponseEntity<List<ProductCar>> searchProductCars(@RequestParam("query") String query) {
//        return ResponseEntity.ok(productCarService.searchProductCars(query));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProductCar(
            @PathVariable("id") Long id,
            @RequestParam("image") MultipartFile image,
            @RequestParam("locale") String locale,
            @RequestParam("category_car_id") Long categoryId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price) throws IOException {

        try {
            // Exemple de traitement de l'image :
             byte[] imageData = image.getBytes();
             //productCar.setImage(imageData);

            ProductCar updatedCar = productCarService.updateProductCars(id, locale, categoryId, name, description, price, imageData);
            // Simuler la mise à jour réussie en renvoyant le produit mis à jour
            return ResponseEntity.ok(updatedCar);
        } catch (Exception e) {
            // Gérer les erreurs de traitement de l'image
            e.printStackTrace();
            // Vous pouvez également renvoyer une réponse d'erreur appropriée ici
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing image");
        }
    }


    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteProductCar(@PathVariable(value = "id") Long productCarId)
            throws ResourceNotFoundException {
        return productCarService.deleteProductCar(productCarId);
    }
    @GetMapping("/productCars")
    public Page<ProductCar> getAllProductscars(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size,
                                               @RequestParam(required = false) String searchTerm,
                                               @RequestParam(required = false) String currentLanguage) {
        Pageable pageable = PageRequest.of(page, size);
        return productCarService.findAllCars(searchTerm, currentLanguage, pageable);
    }


    @GetMapping("/cars")
    public Page<ProductCar> getCarsByCategoryId(@RequestParam(value = "category_car_id") Long category_car_id,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size,
                                                @RequestParam(required = false) String searchTerm,
                                                @RequestParam(required = false) String currentLanguage) {

        Pageable pageable = PageRequest.of(page, size);

        return productCarService.findCarsByCategoryIdAndLanguage(Math.toIntExact(category_car_id), searchTerm, currentLanguage, pageable);
    }


    @GetMapping("/search")
    public ResponseEntity<List<ProductCar>> searchCars(@RequestParam String query,
                                                       @RequestParam String currentLanguage) {
        List<ProductCar> cars = productCarService.searchCars(query, currentLanguage);
//        cars.forEach(c -> System.out.println(new String(c.getImage())));
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{id}/searchByCar")
    public ResponseEntity<List<ProductCar>> searchByCar(@RequestParam Long id
                                                       ) {
        List<ProductCar> cars = productCarService.getsearchByCar(id);
//        cars.forEach(c -> System.out.println(new String(c.getImage())));
        return ResponseEntity.ok(cars);
    }


}
