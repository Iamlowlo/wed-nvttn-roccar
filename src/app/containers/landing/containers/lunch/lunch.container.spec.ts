import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchContainer } from './lunch.container';

describe('LunchContainer', () => {
  let component: LunchContainer;
  let fixture: ComponentFixture<LunchContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
