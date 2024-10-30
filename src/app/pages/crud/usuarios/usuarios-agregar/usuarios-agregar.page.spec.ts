import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosAgregarPage } from './usuarios-agregar.page';

describe('UsuariosAgregarPage', () => {
  let component: UsuariosAgregarPage;
  let fixture: ComponentFixture<UsuariosAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
