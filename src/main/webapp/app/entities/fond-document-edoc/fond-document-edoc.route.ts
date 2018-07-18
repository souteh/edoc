import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';
import { FondDocumentEdocService } from './fond-document-edoc.service';
import { FondDocumentEdocComponent } from './fond-document-edoc.component';
import { FondDocumentEdocDetailComponent } from './fond-document-edoc-detail.component';
import { FondDocumentEdocUpdateComponent } from './fond-document-edoc-update.component';
import { FondDocumentEdocDeletePopupComponent } from './fond-document-edoc-delete-dialog.component';
import { IFondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';

@Injectable({ providedIn: 'root' })
export class FondDocumentEdocResolve implements Resolve<IFondDocumentEdoc> {
    constructor(private service: FondDocumentEdocService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fondDocument: HttpResponse<FondDocumentEdoc>) => fondDocument.body));
        }
        return of(new FondDocumentEdoc());
    }
}

export const fondDocumentRoute: Routes = [
    {
        path: 'fond-document-edoc',
        component: FondDocumentEdocComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'edocApp.fondDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fond-document-edoc/:id/view',
        component: FondDocumentEdocDetailComponent,
        resolve: {
            fondDocument: FondDocumentEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.fondDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fond-document-edoc/new',
        component: FondDocumentEdocUpdateComponent,
        resolve: {
            fondDocument: FondDocumentEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.fondDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fond-document-edoc/:id/edit',
        component: FondDocumentEdocUpdateComponent,
        resolve: {
            fondDocument: FondDocumentEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.fondDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fondDocumentPopupRoute: Routes = [
    {
        path: 'fond-document-edoc/:id/delete',
        component: FondDocumentEdocDeletePopupComponent,
        resolve: {
            fondDocument: FondDocumentEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.fondDocument.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
