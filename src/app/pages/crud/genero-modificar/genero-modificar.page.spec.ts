import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneroModificarPage } from './genero-modificar.page';

describe('GeneroModificarPage', () => {
  let component: GeneroModificarPage;
  let fixture: ComponentFixture<GeneroModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
