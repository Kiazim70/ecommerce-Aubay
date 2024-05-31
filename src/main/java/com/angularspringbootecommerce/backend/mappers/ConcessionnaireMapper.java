package com.angularspringbootecommerce.backend.mappers;

import com.angularspringbootecommerce.backend.dtos.ConcessionnaireDto;
import com.angularspringbootecommerce.backend.models.Concessionnaire;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

public interface ConcessionnaireMapper {
    ConcessionnaireMapper INSTANCE = Mappers.getMapper(ConcessionnaireMapper.class);;

    @Mapping(target = "id", source = "concessionnaire.id")
    ConcessionnaireDto toConcessionnaireDto(Concessionnaire concessionnaire);

    List<ConcessionnaireDto> toConcessionnaireDtos(List<Concessionnaire> concessionnaire);

    Concessionnaire toConcessionnaire(ConcessionnaireDto concessionnaireDto);
}
