import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './components/bank/bank.component';
import { CoreModule } from '../core/core.module';
import { NewRecipientsComponent } from './components/new-recipients/new-recipients.component';
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';


@NgModule({
  declarations: [
    BankComponent,
    NewRecipientsComponent,
    TransferMoneyComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    CoreModule
  ]
})
export class BankModule { }
