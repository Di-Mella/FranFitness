import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinasModificarPage } from './rutinas-modificar.page';

describe('RutinasModificarPage', () => {
  let component: RutinasModificarPage;
  let fixture: ComponentFixture<RutinasModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
