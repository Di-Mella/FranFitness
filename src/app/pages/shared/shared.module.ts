// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { UserOverviewComponent } from '../components/user-overview/user-overview.component';


@NgModule({
  declarations: [LayoutComponent, UserOverviewComponent],
  imports: [
    CommonModule,
    IonicModule, 
    RouterModule 
  ],
  exports: [LayoutComponent,UserOverviewComponent],

})
export class SharedModule {}
