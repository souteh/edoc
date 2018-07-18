import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EdocFondDocumentEdocModule } from './fond-document-edoc/fond-document-edoc.module';
import { EdocTypeDeContenuEdocModule } from './type-de-contenu-edoc/type-de-contenu-edoc.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EdocFondDocumentEdocModule,
        EdocTypeDeContenuEdocModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EdocEntityModule {}
