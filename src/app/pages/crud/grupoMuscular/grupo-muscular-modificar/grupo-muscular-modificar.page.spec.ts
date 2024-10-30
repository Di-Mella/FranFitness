import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrupoMuscularModificarPage } from './grupo-muscular-modificar.page';

describe('GrupoMuscularModificarPage', () => {
  let component: GrupoMuscularModificarPage;
  let fixture: ComponentFixture<GrupoMuscularModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoMuscularModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
