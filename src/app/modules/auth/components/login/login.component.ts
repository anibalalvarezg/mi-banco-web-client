import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CacheService } from 'src/app/modules/core/services/cache.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authError = false;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService,
              private cacheService: CacheService,
              private fb: FormBuilder) { }

  async login(): Promise<void> {
    try {
      const response = await this.authService.signup(this.loginForm.value) as any;
      const { token } = response.data;
      this.cacheService.saveItemLocal('token', token);
      this.authError = false;
    } catch(error) {
      console.error(error.message);
      this.authError = true;
    }
  }
}
