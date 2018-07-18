import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeDeContenuEdoc } from 'app/shared/model/type-de-contenu-edoc.model';
import { TypeDeContenuEdocService } from './type-de-contenu-edoc.service';
import { TypeDeContenuEdocComponent } from './type-de-contenu-edoc.component';
import { TypeDeContenuEdocDetailComponent } from './type-de-contenu-edoc-detail.component';
import { TypeDeContenuEdocUpdateComponent } from './type-de-contenu-edoc-update.component';
import { TypeDeContenuEdocDeletePopupComponent } from './type-de-contenu-edoc-delete-dialog.component';
import { ITypeDeContenuEdoc } from 'app/shared/model/type-de-contenu-edoc.model';

@Injectable({ providedIn: 'root' })
export class TypeDeContenuEdocResolve implements Resolve<ITypeDeContenuEdoc> {
    constructor(private service: TypeDeContenuEdocService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((typeDeContenu: HttpResponse<TypeDeContenuEdoc>) => typeDeContenu.body));
        }
        return of(new TypeDeContenuEdoc());
    }
}

export const typeDeContenuRoute: Routes = [
    {
        path: 'type-de-contenu-edoc',
        component: TypeDeContenuEdocComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.typeDeContenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-de-contenu-edoc/:id/view',
        component: TypeDeContenuEdocDetailComponent,
        resolve: {
            typeDeContenu: TypeDeContenuEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.typeDeContenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-de-contenu-edoc/new',
        component: TypeDeContenuEdocUpdateComponent,
        resolve: {
            typeDeContenu: TypeDeContenuEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.typeDeContenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'type-de-contenu-edoc/:id/edit',
        component: TypeDeContenuEdocUpdateComponent,
        resolve: {
            typeDeContenu: TypeDeContenuEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.typeDeContenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeDeContenuPopupRoute: Routes = [
    {
        path: 'type-de-contenu-edoc/:id/delete',
        component: TypeDeContenuEdocDeletePopupComponent,
        resolve: {
            typeDeContenu: TypeDeContenuEdocResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'edocApp.typeDeContenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
