import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeDeContenuEdoc } from 'app/shared/model/type-de-contenu-edoc.model';
import { TypeDeContenuEdocService } from './type-de-contenu-edoc.service';

@Component({
    selector: 'jhi-type-de-contenu-edoc-delete-dialog',
    templateUrl: './type-de-contenu-edoc-delete-dialog.component.html'
})
export class TypeDeContenuEdocDeleteDialogComponent {
    typeDeContenu: ITypeDeContenuEdoc;

    constructor(
        private typeDeContenuService: TypeDeContenuEdocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeDeContenuService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'typeDeContenuListModification',
                content: 'Deleted an typeDeContenu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-de-contenu-edoc-delete-popup',
    template: ''
})
export class TypeDeContenuEdocDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ typeDeContenu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TypeDeContenuEdocDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.typeDeContenu = typeDeContenu;
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
