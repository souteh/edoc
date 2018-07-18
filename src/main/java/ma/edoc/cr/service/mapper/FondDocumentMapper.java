package ma.edoc.cr.service.mapper;

import ma.edoc.cr.domain.*;
import ma.edoc.cr.service.dto.FondDocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FondDocument and its DTO FondDocumentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FondDocumentMapper extends EntityMapper<FondDocumentDTO, FondDocument> {


    @Mapping(target = "typesContenus", ignore = true)
    FondDocument toEntity(FondDocumentDTO fondDocumentDTO);

    default FondDocument fromId(Long id) {
        if (id == null) {
            return null;
        }
        FondDocument fondDocument = new FondDocument();
        fondDocument.setId(id);
        return fondDocument;
    }
}
