package ma.edoc.cr.service.impl;

import ma.edoc.cr.service.TypeDeContenuService;
import ma.edoc.cr.domain.TypeDeContenu;
import ma.edoc.cr.repository.TypeDeContenuRepository;
import ma.edoc.cr.repository.search.TypeDeContenuSearchRepository;
import ma.edoc.cr.service.dto.TypeDeContenuDTO;
import ma.edoc.cr.service.mapper.TypeDeContenuMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TypeDeContenu.
 */
@Service
@Transactional
public class TypeDeContenuServiceImpl implements TypeDeContenuService {

    private final Logger log = LoggerFactory.getLogger(TypeDeContenuServiceImpl.class);

    private final TypeDeContenuRepository typeDeContenuRepository;

    private final TypeDeContenuMapper typeDeContenuMapper;

    private final TypeDeContenuSearchRepository typeDeContenuSearchRepository;

    public TypeDeContenuServiceImpl(TypeDeContenuRepository typeDeContenuRepository, TypeDeContenuMapper typeDeContenuMapper, TypeDeContenuSearchRepository typeDeContenuSearchRepository) {
        this.typeDeContenuRepository = typeDeContenuRepository;
        this.typeDeContenuMapper = typeDeContenuMapper;
        this.typeDeContenuSearchRepository = typeDeContenuSearchRepository;
    }

    /**
     * Save a typeDeContenu.
     *
     * @param typeDeContenuDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TypeDeContenuDTO save(TypeDeContenuDTO typeDeContenuDTO) {
        log.debug("Request to save TypeDeContenu : {}", typeDeContenuDTO);
        TypeDeContenu typeDeContenu = typeDeContenuMapper.toEntity(typeDeContenuDTO);
        typeDeContenu = typeDeContenuRepository.save(typeDeContenu);
        TypeDeContenuDTO result = typeDeContenuMapper.toDto(typeDeContenu);
        typeDeContenuSearchRepository.save(typeDeContenu);
        return result;
    }

    /**
     * Get all the typeDeContenus.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TypeDeContenuDTO> findAll() {
        log.debug("Request to get all TypeDeContenus");
        return typeDeContenuRepository.findAll().stream()
            .map(typeDeContenuMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one typeDeContenu by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TypeDeContenuDTO> findOne(Long id) {
        log.debug("Request to get TypeDeContenu : {}", id);
        return typeDeContenuRepository.findById(id)
            .map(typeDeContenuMapper::toDto);
    }

    /**
     * Delete the typeDeContenu by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TypeDeContenu : {}", id);
        typeDeContenuRepository.deleteById(id);
        typeDeContenuSearchRepository.deleteById(id);
    }

    /**
     * Search for the typeDeContenu corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TypeDeContenuDTO> search(String query) {
        log.debug("Request to search TypeDeContenus for query {}", query);
        return StreamSupport
            .stream(typeDeContenuSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(typeDeContenuMapper::toDto)
            .collect(Collectors.toList());
    }
}
