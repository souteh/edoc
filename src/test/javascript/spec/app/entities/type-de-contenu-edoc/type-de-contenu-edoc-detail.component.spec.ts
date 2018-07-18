/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EdocTestModule } from '../../../test.module';
import { TypeDeContenuEdocDetailComponent } from 'app/entities/type-de-contenu-edoc/type-de-contenu-edoc-detail.component';
import { TypeDeContenuEdoc } from 'app/shared/model/type-de-contenu-edoc.model';

describe('Component Tests', () => {
    describe('TypeDeContenuEdoc Management Detail Component', () => {
        let comp: TypeDeContenuEdocDetailComponent;
        let fixture: ComponentFixture<TypeDeContenuEdocDetailComponent>;
        const route = ({ data: of({ typeDeContenu: new TypeDeContenuEdoc(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EdocTestModule],
                declarations: [TypeDeContenuEdocDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypeDeContenuEdocDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeDeContenuEdocDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typeDeContenu).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
