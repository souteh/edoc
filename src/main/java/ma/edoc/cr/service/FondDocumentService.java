package ma.edoc.cr.service;

import ma.edoc.cr.service.dto.FondDocumentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing FondDocument.
 */
public interface FondDocumentService {

    /**
     * Save a fondDocument.
     *
     * @param fondDocumentDTO the entity to save
     * @return the persisted entity
     */
    FondDocumentDTO save(FondDocumentDTO fondDocumentDTO);

    /**
     * Get all the fondDocuments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FondDocumentDTO> findAll(Pageable pageable);


    /**
     * Get the "id" fondDocument.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FondDocumentDTO> findOne(Long id);

    /**
     * Delete the "id" fondDocument.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the fondDocument corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FondDocumentDTO> search(String query, Pageable pageable);
}
