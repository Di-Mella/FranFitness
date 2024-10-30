import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EjerciciosListarPage } from './ejercicios-listar.page';

describe('EjerciciosListarPage', () => {
  let component: EjerciciosListarPage;
  let fixture: ComponentFixture<EjerciciosListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EjerciciosListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
