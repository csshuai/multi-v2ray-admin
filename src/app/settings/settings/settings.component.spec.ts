import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggle } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { MockStore, TestingModule } from '@testing/utils';
import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme
} from '../settings.actions';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore<any>;
  let dispatchSpy;

  const getThemeSelectArrow = () => fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1];
  const getSelectOptions = () => fixture.debugElement.queryAll(By.css('mat-option'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [SettingsComponent]
    }).compileComponents();

    store = TestBed.get(Store);
    store.setState({
      settings: {
        theme: 'DEFAULT-THEME',
        autoNightMode: true,
        stickyHeader: true,
        pageAnimations: true,
        pageAnimationsDisabled: false,
        elementsAnimations: true,
        language: 'en'
      }
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should dispatch change sticky header on sticky header toggle', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[0];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new ActionSettingsChangeStickyHeader({ stickyHeader: false }));
  });

  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    getThemeSelectArrow().triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new ActionSettingsChangeTheme({ theme: 'LIGHT-THEME' }));
  });

  it('should dispatch change auto night mode on night mode toggle', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[1];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new ActionSettingsChangeAutoNightMode({ autoNightMode: false }));
  });

  it('should dispatch change animations page', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[2];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new ActionSettingsChangeAnimationsPage({ pageAnimations: false }));
  });

  it('should dispatch change animations elements', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[3];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new ActionSettingsChangeAnimationsElements({ elementsAnimations: false }));
  });

  it('should disable change animations page when disabled is set in state', () => {
    store.setState({
      settings: {
        theme: 'DEFAULT-THEME',
        autoNightMode: true,
        pageAnimations: true,
        pageAnimationsDisabled: true, // change animations disabled
        elementsAnimations: true,
        language: 'en'
      }
    });
    fixture.detectChanges();

    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[2];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
