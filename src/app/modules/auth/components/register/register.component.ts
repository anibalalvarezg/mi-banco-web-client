import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public emailError = false;
  public emailErrorMessage = '';

  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  public async registerUser() {
    try {
      const response = await this.authService.signup(this.registerForm.value) as any;
      if (response) {
        this.authService.newUser = true;
        this.emailError = false;
        this.router.navigate(['auth', 'login']);
      }
    } catch(error) {
      this.authService.newUser = false;
      this.emailError = true;
      const { error: errorResponse } = error;
      if (errorResponse && errorResponse.error && errorResponse.error === 1) {
        this.emailErrorMessage = 'El email ya se encuentra en uso.'
      } else {
        this.emailErrorMessage = 'Ha ocurrido un error! Vuelve a intentarlo más tarde.';
      }
      console.error(error.message);
    }
  }

  public trim($event:any, control: string) {
    let value = $event.target.value;
    value = value.trim().replace(/\s+/g, ' ');
    this.registerForm.get(control)?.setValue(value);
  }
}


