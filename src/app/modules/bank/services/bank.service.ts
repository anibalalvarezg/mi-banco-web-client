import { Injectable } from '@angular/core';
import { CommunicationService } from '../../core/services/communication.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private communicationService: CommunicationService) { }

  public getBanks() {
    return this.communicationService.get('https://bast.dev/api/banks.php', null, true);
  }
}
