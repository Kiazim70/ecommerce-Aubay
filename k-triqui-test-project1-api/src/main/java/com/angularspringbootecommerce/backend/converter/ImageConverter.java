package com.angularspringbootecommerce.backend.converter;

import com.angularspringbootecommerce.backend.models.ProductCar;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

@Component
public class ImageConverter {

    public ImageConverter() throws IOException {
    }

    public static String convertToBase64(File file) throws IOException {

// Lire le contenu du fichier
            byte[] fileContent = new byte[(int) file.length()];

            FileInputStream fis = new FileInputStream(file);
            fis.read(fileContent);
            fis.close();

// Convertir en base64
            return Base64.getEncoder().encodeToString(fileContent);
        }
}

