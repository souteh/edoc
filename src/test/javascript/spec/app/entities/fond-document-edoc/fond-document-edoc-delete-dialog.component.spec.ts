/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EdocTestModule } from '../../../test.module';
import { FondDocumentEdocDeleteDialogComponent } from 'app/entities/fond-document-edoc/fond-document-edoc-delete-dialog.component';
import { FondDocumentEdocService } from 'app/entities/fond-document-edoc/fond-document-edoc.service';

describe('Component Tests', () => {
    describe('FondDocumentEdoc Management Delete Component', () => {
        let comp: FondDocumentEdocDeleteDialogComponent;
        let fixture: ComponentFixture<FondDocumentEdocDeleteDialogComponent>;
        let service: FondDocumentEdocService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EdocTestModule],
                declarations: [FondDocumentEdocDeleteDialogComponent]
            })
                .overrideTemplate(FondDocumentEdocDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FondDocumentEdocDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FondDocumentEdocService);
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
