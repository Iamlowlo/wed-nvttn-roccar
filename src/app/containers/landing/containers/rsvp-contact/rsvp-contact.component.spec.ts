import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RSVPContactComponent } from './rsvp-contact.component';

describe('RSVPContactComponent', () => {
  let component: RSVPContactComponent;
  let fixture: ComponentFixture<RSVPContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RSVPContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RSVPContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
