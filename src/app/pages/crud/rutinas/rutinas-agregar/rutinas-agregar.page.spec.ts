import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinasAgregarPage } from './rutinas-agregar.page';

describe('RutinasAgregarPage', () => {
  let component: RutinasAgregarPage;
  let fixture: ComponentFixture<RutinasAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
