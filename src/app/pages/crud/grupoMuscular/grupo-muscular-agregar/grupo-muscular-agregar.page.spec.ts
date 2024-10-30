import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrupoMuscularAgregarPage } from './grupo-muscular-agregar.page';

describe('GrupoMuscularAgregarPage', () => {
  let component: GrupoMuscularAgregarPage;
  let fixture: ComponentFixture<GrupoMuscularAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoMuscularAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
