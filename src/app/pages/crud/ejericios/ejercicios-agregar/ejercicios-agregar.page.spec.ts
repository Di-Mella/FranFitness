import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EjerciciosAgregarPage } from './ejercicios-agregar.page';

describe('EjerciciosAgregarPage', () => {
  let component: EjerciciosAgregarPage;
  let fixture: ComponentFixture<EjerciciosAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EjerciciosAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
