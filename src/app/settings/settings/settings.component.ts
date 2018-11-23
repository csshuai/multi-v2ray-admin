import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme
} from '../settings.actions';
import { SettingsState, State } from '../settings.model';
import { selectSettings } from '../settings.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'de', label: 'de' },
    { value: 'sk', label: 'sk' },
    { value: 'fr', label: 'fr' },
    { value: 'es', label: 'es' },
    { value: 'pt-br', label: 'pt-br' }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(new ActionSettingsChangeAutoNightMode({ autoNightMode }));
  }

  onStickyHeaderToggle({ checked: stickyHeader }) {
    this.store.dispatch(new ActionSettingsChangeStickyHeader({ stickyHeader }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(new ActionSettingsChangeAnimationsPage({ pageAnimations }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(new ActionSettingsChangeAnimationsElements({ elementsAnimations }));
  }
}
