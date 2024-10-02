import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexibilidadPage } from './flexibilidad.page';

describe('FlexibilidadPage', () => {
  let component: FlexibilidadPage;
  let fixture: ComponentFixture<FlexibilidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexibilidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
