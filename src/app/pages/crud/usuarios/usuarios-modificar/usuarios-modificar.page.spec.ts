import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosModificarPage } from './usuarios-modificar.page';

describe('UsuariosModificarPage', () => {
  let component: UsuariosModificarPage;
  let fixture: ComponentFixture<UsuariosModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
