import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosListarPage } from './usuarios-listar.page';

describe('UsuariosListarPage', () => {
  let component: UsuariosListarPage;
  let fixture: ComponentFixture<UsuariosListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
