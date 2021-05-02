import { Injectable } from '@angular/core';
import { CommunicationService } from '../../core/services/communication.service';

@Injectable()
export class BankService {

  constructor(private communicationService: CommunicationService) { }

  public getBanks() {
    return this.communicationService.get('https://bast.dev/api/banks.php', null, true);
  }

  public getAccounts() {
    return this.communicationService.get('bank/accounts');
  }

  public createRecipient(params: any) {
    return this.communicationService.post('bank/new-recipient', params).toPromise();
  }
}
