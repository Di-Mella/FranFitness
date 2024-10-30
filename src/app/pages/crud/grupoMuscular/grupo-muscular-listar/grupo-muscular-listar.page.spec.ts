import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrupoMuscularListarPage } from './grupo-muscular-listar.page';

describe('GrupoMuscularListarPage', () => {
  let component: GrupoMuscularListarPage;
  let fixture: ComponentFixture<GrupoMuscularListarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoMuscularListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
