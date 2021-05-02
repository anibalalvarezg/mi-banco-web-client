import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CacheService } from 'src/app/modules/core/services/cache.service';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-new-recipients',
  templateUrl: './new-recipients.component.html',
  styleUrls: ['./new-recipients.component.scss']
})
export class NewRecipientsComponent implements OnInit {

  public bankList: { name: string, id: string}[]= [];
  public accountList: { name: string, value: string}[]= [];
  public error = false;
  public success = false;

  public recipientForm = this.fb.group({
    name: ['', Validators.required],
    rut: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    bank: ['', Validators.required],
    account: ['', Validators.required],
    accountType: ['', Validators.required],
  });

  constructor(
    private bankService: BankService,
    private chacheService: CacheService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.bankService.getBanks().pipe(take(1)).subscribe((resp: any) => {
      this.bankList = resp.banks as { name: string, id: string}[];
    });

    this.bankService.getAccounts().pipe(take(1)).subscribe((resp: any) => {
      this.accountList = resp.data;
    });
  }

  public async createRecipient() {
    const user = this.chacheService.getItemSession('session');
    let userId;
    if (!user) {
      const session = await this.authService.getProfile() as any;
      this.chacheService.saveItemSession('session', session);
      userId = session && session._id || null;
    } else {
      userId = user && user._id || null;
    }
    const newRecipient = {
      userId,
      ...this.recipientForm.value,
    }

    try {
      const response = await this.bankService.createRecipient(newRecipient);
      this.recipientForm.reset();
      this.error = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 6000);
    } catch(error) {
      console.error(error.message);
      this.error = true;
      this.success = false;
    }

  }

}
