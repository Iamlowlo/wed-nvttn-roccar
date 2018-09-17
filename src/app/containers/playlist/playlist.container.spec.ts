import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistContainer } from './playlist.container';

describe('PlaylistContainer', () => {
  let component: PlaylistContainer;
  let fixture: ComponentFixture<PlaylistContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
