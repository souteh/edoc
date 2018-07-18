import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITypeDeContenuEdoc } from 'app/shared/model/type-de-contenu-edoc.model';
import { TypeDeContenuEdocService } from './type-de-contenu-edoc.service';
import { IFondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';
import { FondDocumentEdocService } from 'app/entities/fond-document-edoc';

@Component({
    selector: 'jhi-type-de-contenu-edoc-update',
    templateUrl: './type-de-contenu-edoc-update.component.html'
})
export class TypeDeContenuEdocUpdateComponent implements OnInit {
    private _typeDeContenu: ITypeDeContenuEdoc;
    isSaving: boolean;

    fonddocuments: IFondDocumentEdoc[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private typeDeContenuService: TypeDeContenuEdocService,
        private fondDocumentService: FondDocumentEdocService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ typeDeContenu }) => {
            this.typeDeContenu = typeDeContenu;
        });
        this.fondDocumentService.query().subscribe(
            (res: HttpResponse<IFondDocumentEdoc[]>) => {
                this.fonddocuments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.typeDeContenu.id !== undefined) {
            this.subscribeToSaveResponse(this.typeDeContenuService.update(this.typeDeContenu));
        } else {
            this.subscribeToSaveResponse(this.typeDeContenuService.create(this.typeDeContenu));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDeContenuEdoc>>) {
        result.subscribe((res: HttpResponse<ITypeDeContenuEdoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFondDocumentById(index: number, item: IFondDocumentEdoc) {
        return item.id;
    }
    get typeDeContenu() {
        return this._typeDeContenu;
    }

    set typeDeContenu(typeDeContenu: ITypeDeContenuEdoc) {
        this._typeDeContenu = typeDeContenu;
    }
}
