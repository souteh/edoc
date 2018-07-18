import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';

@Component({
    selector: 'jhi-fond-document-edoc-detail',
    templateUrl: './fond-document-edoc-detail.component.html'
})
export class FondDocumentEdocDetailComponent implements OnInit {
    fondDocument: IFondDocumentEdoc;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fondDocument }) => {
            this.fondDocument = fondDocument;
        });
    }

    previousState() {
        window.history.back();
    }
}
