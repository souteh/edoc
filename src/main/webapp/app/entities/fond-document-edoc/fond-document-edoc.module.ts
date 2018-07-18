import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EdocSharedModule } from 'app/shared';
import {
    FondDocumentEdocComponent,
    FondDocumentEdocDetailComponent,
    FondDocumentEdocUpdateComponent,
    FondDocumentEdocDeletePopupComponent,
    FondDocumentEdocDeleteDialogComponent,
    fondDocumentRoute,
    fondDocumentPopupRoute
} from './';

const ENTITY_STATES = [...fondDocumentRoute, ...fondDocumentPopupRoute];

@NgModule({
    imports: [EdocSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FondDocumentEdocComponent,
        FondDocumentEdocDetailComponent,
        FondDocumentEdocUpdateComponent,
        FondDocumentEdocDeleteDialogComponent,
        FondDocumentEdocDeletePopupComponent
    ],
    entryComponents: [
        FondDocumentEdocComponent,
        FondDocumentEdocUpdateComponent,
        FondDocumentEdocDeleteDialogComponent,
        FondDocumentEdocDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EdocFondDocumentEdocModule {}
