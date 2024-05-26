package com.angularspringbootecommerce.backend.mappers;

import com.angularspringbootecommerce.backend.dtos.CategoryCarDto;
import com.angularspringbootecommerce.backend.models.CategoryCar;
import com.angularspringbootecommerce.backend.models.Product;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);;

    @Mapping(target = "id", source = "category.id")
    CategoryCarDto tocategoryDto(Product product);

    List<CategoryCarDto> toCategoryDtos(List<CategoryCar> category);

    CategoryCar toCategory(CategoryCarDto categoryDto);
}
