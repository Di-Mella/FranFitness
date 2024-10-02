import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileModificationsPage } from './profile-modifications.page';

describe('ProfileModificationsPage', () => {
  let component: ProfileModificationsPage;
  let fixture: ComponentFixture<ProfileModificationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
