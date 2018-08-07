package ma.edoc.cr.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TypeDeContenuSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TypeDeContenuSearchRepositoryMockConfiguration {

    @MockBean
    private TypeDeContenuSearchRepository mockTypeDeContenuSearchRepository;

}
