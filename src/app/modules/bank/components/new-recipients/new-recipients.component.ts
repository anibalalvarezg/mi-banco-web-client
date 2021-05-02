import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-new-recipients',
  templateUrl: './new-recipients.component.html',
  styleUrls: ['./new-recipients.component.scss']
})
export class NewRecipientsComponent implements OnInit {

  bankList: { name: string, id: string}[]= [];
  accountList: { name: string, value: string}[]= [];

  constructor(private bankService: BankService) { }

  ngOnInit(): void {
    this.bankService.getBanks().subscribe((resp: any) => {
      this.bankList = resp.banks as { name: string, id: string}[];
    });

    this.bankService.getAccounts().subscribe((resp: any) => {
      this.accountList = resp.data;
    });
  }

}
