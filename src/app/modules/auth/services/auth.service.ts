import { Injectable } from '@angular/core';
import { CommunicationService } from '../../core/services/communication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public newUser = false;
  constructor(private communicationService: CommunicationService) { }

  signin(body: any) {
    return this.communicationService.post('auth/signin', body).toPromise();
  }

  signup(body: any) {
    return this.communicationService.post('auth/signup', body).toPromise();
  }

  getProfile() {
    return this.communicationService.get('auth/profile').toPromise();
  }
}
