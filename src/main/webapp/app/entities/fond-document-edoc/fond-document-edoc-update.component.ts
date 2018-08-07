import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';
import { FondDocumentEdocService } from './fond-document-edoc.service';

@Component({
    selector: 'jhi-fond-document-edoc-update',
    templateUrl: './fond-document-edoc-update.component.html'
})
export class FondDocumentEdocUpdateComponent implements OnInit {
    private _fondDocument: IFondDocumentEdoc;
    isSaving: boolean;

    constructor(private fondDocumentService: FondDocumentEdocService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fondDocument }) => {
            this.fondDocument = fondDocument;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fondDocument.id !== undefined) {
            this.subscribeToSaveResponse(this.fondDocumentService.update(this.fondDocument));
        } else {
            this.subscribeToSaveResponse(this.fondDocumentService.create(this.fondDocument));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFondDocumentEdoc>>) {
        result.subscribe((res: HttpResponse<IFondDocumentEdoc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get fondDocument() {
        return this._fondDocument;
    }

    set fondDocument(fondDocument: IFondDocumentEdoc) {
        this._fondDocument = fondDocument;
    }
}
