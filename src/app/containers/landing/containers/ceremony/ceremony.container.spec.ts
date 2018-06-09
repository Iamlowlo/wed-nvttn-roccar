import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremonyContainer } from './ceremony.container';

describe('CeremonyContainer', () => {
  let component: CeremonyContainer;
  let fixture: ComponentFixture<CeremonyContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeremonyContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeremonyContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
