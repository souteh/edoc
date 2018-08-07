/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EdocTestModule } from '../../../test.module';
import { TypeDeContenuEdocDeleteDialogComponent } from 'app/entities/type-de-contenu-edoc/type-de-contenu-edoc-delete-dialog.component';
import { TypeDeContenuEdocService } from 'app/entities/type-de-contenu-edoc/type-de-contenu-edoc.service';

describe('Component Tests', () => {
    describe('TypeDeContenuEdoc Management Delete Component', () => {
        let comp: TypeDeContenuEdocDeleteDialogComponent;
        let fixture: ComponentFixture<TypeDeContenuEdocDeleteDialogComponent>;
        let service: TypeDeContenuEdocService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EdocTestModule],
                declarations: [TypeDeContenuEdocDeleteDialogComponent]
            })
                .overrideTemplate(TypeDeContenuEdocDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeDeContenuEdocDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDeContenuEdocService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
