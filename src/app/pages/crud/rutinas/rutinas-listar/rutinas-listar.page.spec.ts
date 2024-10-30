import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinasListarPage } from './rutinas-listar.page';

describe('RutinasListarPage', () => {
  let component: RutinasListarPage;
  let fixture: ComponentFixture<RutinasListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
