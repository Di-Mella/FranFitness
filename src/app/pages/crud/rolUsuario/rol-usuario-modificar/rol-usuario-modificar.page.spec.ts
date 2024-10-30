import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolUsuarioModificarPage } from './rol-usuario-modificar.page';

describe('RolUsuarioModificarPage', () => {
  let component: RolUsuarioModificarPage;
  let fixture: ComponentFixture<RolUsuarioModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RolUsuarioModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
