// src/app/shared/shared.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { UserOverviewComponent } from '../../components/user-overview/user-overview.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';


@NgModule({
  declarations: [LayoutComponent, UserOverviewComponent, TabsComponent],
  imports: [
    CommonModule,
    IonicModule, 
    RouterModule 
  ],
  exports: [LayoutComponent,UserOverviewComponent,TabsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule {}
