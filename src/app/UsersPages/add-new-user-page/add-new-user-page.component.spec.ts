import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserPageComponent } from './add-new-user-page.component';

describe('AddNewUserPageComponent', () => {
  let component: AddNewUserPageComponent;
  let fixture: ComponentFixture<AddNewUserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewUserPageComponent]
    });
    fixture = TestBed.createComponent(AddNewUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
