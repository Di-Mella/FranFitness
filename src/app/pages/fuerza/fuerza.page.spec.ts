import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuerzaPage } from './fuerza.page';

describe('FuerzaPage', () => {
  let component: FuerzaPage;
  let fixture: ComponentFixture<FuerzaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FuerzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
