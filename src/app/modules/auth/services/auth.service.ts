import { Injectable } from '@angular/core';
import { CommunicationService } from '../../core/services/communication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private communicationService: CommunicationService) { }

  signup(body: any) {
    return this.communicationService.post('auth/signin', body).toPromise();
  }
}
