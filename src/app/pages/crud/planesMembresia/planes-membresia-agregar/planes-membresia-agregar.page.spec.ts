import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesMembresiaAgregarPage } from './planes-membresia-agregar.page';

describe('PlanesMembresiaAgregarPage', () => {
  let component: PlanesMembresiaAgregarPage;
  let fixture: ComponentFixture<PlanesMembresiaAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesMembresiaAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
