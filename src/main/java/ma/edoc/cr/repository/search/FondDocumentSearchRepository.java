package ma.edoc.cr.repository.search;

import ma.edoc.cr.domain.FondDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FondDocument entity.
 */
public interface FondDocumentSearchRepository extends ElasticsearchRepository<FondDocument, Long> {
}
