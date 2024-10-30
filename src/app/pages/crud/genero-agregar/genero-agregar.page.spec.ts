import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneroAgregarPage } from './genero-agregar.page';

describe('GeneroAgregarPage', () => {
  let component: GeneroAgregarPage;
  let fixture: ComponentFixture<GeneroAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
