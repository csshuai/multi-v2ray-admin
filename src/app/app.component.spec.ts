import { async, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core';

import { TestingModule } from '@testing/utils';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
