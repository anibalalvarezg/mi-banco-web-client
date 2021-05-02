import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { IHTTPResponse } from 'src/app/modules/core/interfaces/http-response';
import { CacheService } from 'src/app/modules/core/services/cache.service';
import { IAccount, IBank, IBanks, IRecipient } from '../../interfaces';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss']
})
export class TransferMoneyComponent implements OnInit {

  public recipientSelected: string= '';
  public recipientsList: IRecipient[] = [];
  public bankList: IBank[] = [];
  public accountList: IAccount[] = [];
  public userId: string = '';
  public hasRecipients = true;

  public transferAmountForm = this.fb.group({
    amount: ['', [Validators.required, Validators.min(0)]],
  })

  constructor(
    private config: NgSelectConfig,
    private bankService: BankService,
    private fb: FormBuilder,
    private cacheService: CacheService,
    ) {
    this.config.notFoundText = 'Destinatario no encontrado.';
  }

  public async ngOnInit(): Promise<void>   {
    const user = JSON.parse(this.cacheService.getItemLocal('session')) || null;
    if (user) {
      this.userId = user._id;
    }

    const resp = await this.bankService.getAllRecipients({ userId: this.userId }) as IHTTPResponse<IRecipient[]>
    this.recipientsList = resp.data;
    this.hasRecipients = this.recipientsList.length > 0;

    const bankResp = await this.bankService.getBanks() as IBanks;
    this.bankList = bankResp.banks;

    const accountResp = await this.bankService.getAccounts() as IHTTPResponse<IAccount[]>;
    this.accountList = accountResp.data;
  }

  get recipient() {
    if (this.recipientsList.length && this.recipientSelected) {
      let recipient =  this.recipientsList.find((recipient: any) => recipient._id === this.recipientSelected);
      const bank = this.bankList.find(bank => bank.id === recipient?.bank);
      const accountType = this.accountList.find(account => account.value === recipient?.accountType);
      if (bank && bank.name && recipient) {
        recipient.bank = bank.name || recipient.name;
      }

      if (accountType && accountType.name && recipient) {
        recipient.accountType = accountType.name || recipient.name;
      }
      return recipient;
    }

    return null;
  }

  public async transfer() {
    const { amount } = this.transferAmountForm.value;

    const body = {
      name: this.recipient?.name,
      rut: this.recipient?.rut,
      bank: this.recipient?.bank,
      accountType: this.recipient?.accountType,
      recipientId: this.recipient?._id,
      userId: this.userId,
      amount,
    }

    try {
      await this.bankService.transfer(body);
      this.transferAmountForm.reset();
      this.recipientSelected = '';
    } catch(error) {
      console.error(error.message);
    }

  }
}
