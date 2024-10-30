import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesMembresiaListarPage } from './planes-membresia-listar.page';

describe('PlanesMembresiaListarPage', () => {
  let component: PlanesMembresiaListarPage;
  let fixture: ComponentFixture<PlanesMembresiaListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesMembresiaListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
