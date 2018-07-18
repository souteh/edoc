import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EdocSharedModule } from 'app/shared';
import {
    TypeDeContenuEdocComponent,
    TypeDeContenuEdocDetailComponent,
    TypeDeContenuEdocUpdateComponent,
    TypeDeContenuEdocDeletePopupComponent,
    TypeDeContenuEdocDeleteDialogComponent,
    typeDeContenuRoute,
    typeDeContenuPopupRoute
} from './';

const ENTITY_STATES = [...typeDeContenuRoute, ...typeDeContenuPopupRoute];

@NgModule({
    imports: [EdocSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeDeContenuEdocComponent,
        TypeDeContenuEdocDetailComponent,
        TypeDeContenuEdocUpdateComponent,
        TypeDeContenuEdocDeleteDialogComponent,
        TypeDeContenuEdocDeletePopupComponent
    ],
    entryComponents: [
        TypeDeContenuEdocComponent,
        TypeDeContenuEdocUpdateComponent,
        TypeDeContenuEdocDeleteDialogComponent,
        TypeDeContenuEdocDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EdocTypeDeContenuEdocModule {}
