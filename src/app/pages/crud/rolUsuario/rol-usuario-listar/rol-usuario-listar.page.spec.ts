import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolUsuarioListarPage } from './rol-usuario-listar.page';

describe('RolUsuarioListarPage', () => {
  let component: RolUsuarioListarPage;
  let fixture: ComponentFixture<RolUsuarioListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RolUsuarioListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
