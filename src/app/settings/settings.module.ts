import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SettingsEffects } from './settings.effects';

import { settingsReducer } from './settings.reducer';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
