import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoneyTransferRepeatPage } from './money-transfer-repeat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoneyTransferRepeatPage
      }
    ])
  ],
  declarations: [MoneyTransferRepeatPage]
})
export class MoneyTransferRepeatPageModule {}
