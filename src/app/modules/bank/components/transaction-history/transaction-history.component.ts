import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IHTTPResponse } from 'src/app/modules/core/interfaces/http-response';
import { CacheService } from 'src/app/modules/core/services/cache.service';
import { ITrasnfer } from '../../interfaces';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  public userId = '';
  public history: any[] = [];

  constructor(
    private cacheService: CacheService,
    private bankService: BankService,
  ) { }

  async ngOnInit(): Promise<void> {
    const user = this.cacheService.getItemSession('session') || null;
    if (user) {
      this.userId = user._id;
    }

    try {
      const response = await this.bankService.getTransferHistory({ userId: this.userId }) as IHTTPResponse<ITrasnfer[]>;
      if (response && response.data) {
        this.history = response.data.map(hist => {
          return {
            name: hist.name,
            rut: hist.rut,
            bank: hist.bank,
            accountType: hist.accountType,
            amount: hist.amount,
          }
        });
      }
    } catch(error) {
      console.error(error.message);
    }
  }

}
