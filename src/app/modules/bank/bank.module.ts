import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './components/bank/bank.component';
import { CoreModule } from '../core/core.module';
import { NewRecipientsComponent } from './components/new-recipients/new-recipients.component';
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../core/interceptors/auth-interceptor.service';
import { BankService } from './services/bank.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';


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
  ],
  providers: [
    BankService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
})
export class BankModule { }
