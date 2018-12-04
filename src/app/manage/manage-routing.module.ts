import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from '@app/manage/service/service.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ServiceComponent,
    data: { title: 'menu.manage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule {}
