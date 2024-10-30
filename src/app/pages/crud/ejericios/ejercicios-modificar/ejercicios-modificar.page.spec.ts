import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EjerciciosModificarPage } from './ejercicios-modificar.page';

describe('EjerciciosModificarPage', () => {
  let component: EjerciciosModificarPage;
  let fixture: ComponentFixture<EjerciciosModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EjerciciosModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
