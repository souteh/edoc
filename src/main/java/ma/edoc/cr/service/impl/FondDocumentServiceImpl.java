package ma.edoc.cr.service.impl;

import ma.edoc.cr.service.FondDocumentService;
import ma.edoc.cr.domain.FondDocument;
import ma.edoc.cr.repository.FondDocumentRepository;
import ma.edoc.cr.repository.search.FondDocumentSearchRepository;
import ma.edoc.cr.service.dto.FondDocumentDTO;
import ma.edoc.cr.service.mapper.FondDocumentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing FondDocument.
 */
@Service
@Transactional
public class FondDocumentServiceImpl implements FondDocumentService {

    private final Logger log = LoggerFactory.getLogger(FondDocumentServiceImpl.class);

    private final FondDocumentRepository fondDocumentRepository;

    private final FondDocumentMapper fondDocumentMapper;

    private final FondDocumentSearchRepository fondDocumentSearchRepository;

    public FondDocumentServiceImpl(FondDocumentRepository fondDocumentRepository, FondDocumentMapper fondDocumentMapper, FondDocumentSearchRepository fondDocumentSearchRepository) {
        this.fondDocumentRepository = fondDocumentRepository;
        this.fondDocumentMapper = fondDocumentMapper;
        this.fondDocumentSearchRepository = fondDocumentSearchRepository;
    }

    /**
     * Save a fondDocument.
     *
     * @param fondDocumentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FondDocumentDTO save(FondDocumentDTO fondDocumentDTO) {
        log.debug("Request to save FondDocument : {}", fondDocumentDTO);
        FondDocument fondDocument = fondDocumentMapper.toEntity(fondDocumentDTO);
        fondDocument = fondDocumentRepository.save(fondDocument);
        FondDocumentDTO result = fondDocumentMapper.toDto(fondDocument);
        fondDocumentSearchRepository.save(fondDocument);
        return result;
    }

    /**
     * Get all the fondDocuments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FondDocumentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FondDocuments");
        return fondDocumentRepository.findAll(pageable)
            .map(fondDocumentMapper::toDto);
    }


    /**
     * Get one fondDocument by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FondDocumentDTO> findOne(Long id) {
        log.debug("Request to get FondDocument : {}", id);
        return fondDocumentRepository.findById(id)
            .map(fondDocumentMapper::toDto);
    }

    /**
     * Delete the fondDocument by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FondDocument : {}", id);
        fondDocumentRepository.deleteById(id);
        fondDocumentSearchRepository.deleteById(id);
    }

    /**
     * Search for the fondDocument corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FondDocumentDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of FondDocuments for query {}", query);
        return fondDocumentSearchRepository.search(queryStringQuery(query), pageable)
            .map(fondDocumentMapper::toDto);
    }
}
