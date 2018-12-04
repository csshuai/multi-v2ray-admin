import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddGroupComponent } from './add-group/add-group.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageEffects } from './manage.effects';
import { ManageService } from './manage.service';
import { MANAGE_NAME, reducers } from './manage.state';
import { ServiceComponent } from './service/service.component';

@NgModule({
  imports: [
    SharedModule,
    ManageRoutingModule,

    StoreModule.forFeature(MANAGE_NAME, reducers),
    EffectsModule.forFeature([ManageEffects])
  ],
  entryComponents: [ServiceComponent, AddGroupComponent, AddUserComponent],
  declarations: [ServiceComponent, AddGroupComponent, AddUserComponent],
  providers: [ManageService]
})
export class ManageModule {}
