package com.angularspringbootecommerce.backend.mappers;

import com.angularspringbootecommerce.backend.dtos.ProductDto;
import com.angularspringbootecommerce.backend.models.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);;

    @Mapping(target = "id", source = "product.id")
    ProductDto toProductDTO(Product product);

    List<ProductDto> toProductDTOs(List<Product> products);

    Product toProduct(ProductDto productDto);


}
