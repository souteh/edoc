package ma.edoc.cr.repository.search;

import ma.edoc.cr.domain.TypeDeContenu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TypeDeContenu entity.
 */
public interface TypeDeContenuSearchRepository extends ElasticsearchRepository<TypeDeContenu, Long> {
}
