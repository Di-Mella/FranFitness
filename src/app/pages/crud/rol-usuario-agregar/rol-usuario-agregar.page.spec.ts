import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolUsuarioAgregarPage } from './rol-usuario-agregar.page';

describe('RolUsuarioAgregarPage', () => {
  let component: RolUsuarioAgregarPage;
  let fixture: ComponentFixture<RolUsuarioAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RolUsuarioAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
