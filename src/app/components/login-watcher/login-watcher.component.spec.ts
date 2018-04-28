import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWatcherComponent } from './login-watcher.component';

describe('LoginWatcherComponent', () => {
  let component: LoginWatcherComponent;
  let fixture: ComponentFixture<LoginWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
