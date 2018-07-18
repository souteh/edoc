import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';
import { FondDocumentEdocService } from './fond-document-edoc.service';

@Component({
    selector: 'jhi-fond-document-edoc-delete-dialog',
    templateUrl: './fond-document-edoc-delete-dialog.component.html'
})
export class FondDocumentEdocDeleteDialogComponent {
    fondDocument: IFondDocumentEdoc;

    constructor(
        private fondDocumentService: FondDocumentEdocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fondDocumentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fondDocumentListModification',
                content: 'Deleted an fondDocument'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fond-document-edoc-delete-popup',
    template: ''
})
export class FondDocumentEdocDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fondDocument }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FondDocumentEdocDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fondDocument = fondDocument;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
