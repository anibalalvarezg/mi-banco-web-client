import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IHTTPResponse } from 'src/app/modules/core/interfaces/http-response';
import { CacheService } from 'src/app/modules/core/services/cache.service';
import { IAccount, IBanks, IRecipient } from '../../interfaces';
import { BankService } from '../../services/bank.service';
import {  validate, clean, format } from 'rut.js'
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
  public userId: string = '';
  public recipientsList: IRecipient[] = [];

  public recipientForm = this.fb.group({
    name: ['', Validators.required],
    rut: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    bank: ['', Validators.required],
    account: ['', Validators.required],
    accountType: ['', Validators.required],
  });

  constructor(
    private bankService: BankService,
    private cacheService: CacheService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  public async ngOnInit(): Promise<void> {
    const user = JSON.parse(this.cacheService.getItemLocal('session')) || null;
    if (user) {
      this.userId = user._id;
    }

    const resp = await this.bankService.getBanks() as IBanks;
    this.bankList = resp.banks;

    const accountResp = await this.bankService.getAccounts() as IHTTPResponse<IAccount[]>;
    this.accountList = accountResp.data;

    const recipientsList = await this.bankService.getAllRecipients({ userId: this.userId }) as IHTTPResponse<IRecipient[]>
    this.recipientsList = recipientsList.data;
  }

  public async createRecipient() {
    const user = JSON.parse(this.cacheService.getItemLocal('session'));
    let userId;
    if (!user) {
      const session = await this.authService.getProfile() as any;
      this.cacheService.saveItemLocal('session', JSON.stringify(session));
      userId = session && session._id || null;
    } else {
      userId = user && user._id || null;
    }
    const newRecipient = {
      userId,
      ...this.recipientForm.value,
    }

    try {
      const resp = await this.bankService.createRecipient(newRecipient);
      this.error = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 6000);
      if (resp) {
        this.recipientForm.reset();
      }
    } catch(error) {
      console.error(error.message);
      this.error = true;
      this.success = false;
    }

  }

  public get showErrorAlert(): boolean {
    return this.error;
  }

  public get showSuccessAlert(): boolean {
    return this.success;
  }

  public checkLength($event:any, maxLength: number, control: string) {
    const value = $event.target.value;
    this.recipientForm.get(control)?.setValue(value.slice(0, maxLength));
  }

  public trim($event:any, control: string) {
    let value = $event.target.value;
    if (control === 'email') {
      value = value.trim().replace(/\s+/g, ' ');
    } else {
      value = value.trimLeft().replace(/\s+/g, ' ');
    }
    this.recipientForm.get(control)?.setValue(value);
  }

  public rutValidation($event:any) {
    let value = $event.target.value;
    value = value.slice(0, 12);
    value = format(clean(value));
    if (value === '-') {
      this.recipientForm.get('rut')?.setValue('');
    } else {
      this.recipientForm.get('rut')?.setValue(value);
    }

    if (validate(value)) {
      this.recipientForm.get('rut')?.setErrors(null);
      if (this.recipientsList.find(recipient => recipient.rut.toLowerCase() === value.toLowerCase())) {
        this.recipientForm.get('rut')?.setErrors({ rutExists: true});
      }
    } else {
      this.recipientForm.get('rut')?.setErrors({ rut: true });
    }
  }
}
