import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesMembresiaModificarPage } from './planes-membresia-modificar.page';

describe('PlanesMembresiaModificarPage', () => {
  let component: PlanesMembresiaModificarPage;
  let fixture: ComponentFixture<PlanesMembresiaModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesMembresiaModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
