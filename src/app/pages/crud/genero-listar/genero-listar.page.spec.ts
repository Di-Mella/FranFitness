import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneroListarPage } from './genero-listar.page';

describe('GeneroListarPage', () => {
  let component: GeneroListarPage;
  let fixture: ComponentFixture<GeneroListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
