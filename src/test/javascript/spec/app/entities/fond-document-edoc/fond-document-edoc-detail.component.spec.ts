/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EdocTestModule } from '../../../test.module';
import { FondDocumentEdocDetailComponent } from 'app/entities/fond-document-edoc/fond-document-edoc-detail.component';
import { FondDocumentEdoc } from 'app/shared/model/fond-document-edoc.model';

describe('Component Tests', () => {
    describe('FondDocumentEdoc Management Detail Component', () => {
        let comp: FondDocumentEdocDetailComponent;
        let fixture: ComponentFixture<FondDocumentEdocDetailComponent>;
        const route = ({ data: of({ fondDocument: new FondDocumentEdoc(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EdocTestModule],
                declarations: [FondDocumentEdocDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FondDocumentEdocDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FondDocumentEdocDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fondDocument).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
