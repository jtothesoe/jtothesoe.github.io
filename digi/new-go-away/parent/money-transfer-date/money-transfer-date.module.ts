import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoneyTransferDatePage } from './money-transfer-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoneyTransferDatePage
      }
    ])
  ],
  declarations: [MoneyTransferDatePage]
})
export class MoneyTransferDatePageModule {}
