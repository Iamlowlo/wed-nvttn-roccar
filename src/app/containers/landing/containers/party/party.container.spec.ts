import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyContainer } from './party.container';

describe('PartyContainer', () => {
  let component: PartyContainer;
  let fixture: ComponentFixture<PartyContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
