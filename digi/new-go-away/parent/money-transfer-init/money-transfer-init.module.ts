import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoneyTransferInitPage } from './money-transfer-init.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoneyTransferInitPage
      }
    ])
  ],
  declarations: [MoneyTransferInitPage]
})
export class MoneyTransferInitPageModule {}
