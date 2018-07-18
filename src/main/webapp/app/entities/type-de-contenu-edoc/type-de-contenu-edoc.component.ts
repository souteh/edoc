import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITypeDeContenuEdoc } from 'app/shared/model/type-de-contenu-edoc.model';
import { Principal } from 'app/core';
import { TypeDeContenuEdocService } from './type-de-contenu-edoc.service';

@Component({
    selector: 'jhi-type-de-contenu-edoc',
    templateUrl: './type-de-contenu-edoc.component.html'
})
export class TypeDeContenuEdocComponent implements OnInit, OnDestroy {
    typeDeContenus: ITypeDeContenuEdoc[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private typeDeContenuService: TypeDeContenuEdocService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.typeDeContenuService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITypeDeContenuEdoc[]>) => (this.typeDeContenus = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.typeDeContenuService.query().subscribe(
            (res: HttpResponse<ITypeDeContenuEdoc[]>) => {
                this.typeDeContenus = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTypeDeContenus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITypeDeContenuEdoc) {
        return item.id;
    }

    registerChangeInTypeDeContenus() {
        this.eventSubscriber = this.eventManager.subscribe('typeDeContenuListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
