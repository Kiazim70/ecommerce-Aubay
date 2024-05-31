package com.angularspringbootecommerce.backend.mappers;

import com.angularspringbootecommerce.backend.dtos.CreditCardDto;
import com.angularspringbootecommerce.backend.dtos.ProductDto;
import com.angularspringbootecommerce.backend.models.CreditCard;
import com.angularspringbootecommerce.backend.models.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CreditCardMapper {
    CreditCardMapper INSTANCE = Mappers.getMapper(CreditCardMapper.class);;

    @Mapping(target = "id", source = "creditCard.id")
    CreditCardDto toCreditCardDTO(CreditCard creditCard);

    List<CreditCardDto> toCreditCardDTOs(List<CreditCard> creditCards);

    CreditCard toCreditCard(CreditCardDto creditCardDto);
}
