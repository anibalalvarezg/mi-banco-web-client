import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './components/bank/bank.component';
import { NewRecipientsComponent } from './components/new-recipients/new-recipients.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';

const routes: Routes = [{
  path: '',
  component: BankComponent,
  children: [
    {
      path: '',
      component: NewRecipientsComponent,
      pathMatch: 'full'
    },
    {
      path: 'new-recipients',
      component: NewRecipientsComponent
    },
    {
      path: 'transfer',
      component: TransferMoneyComponent
    },
    {
      path: 'history',
      component: TransactionHistoryComponent
    },
    {
      path: '**',
      redirectTo: '/Recipients'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
