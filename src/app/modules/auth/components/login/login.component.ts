import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/modules/core/services/cache.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError = false;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public authService: AuthService,
              private cacheService: CacheService,
              private fb: FormBuilder,
              private router: Router) { }

  public ngOnInit() {
    if (this.cacheService.getItemLocal('token')) {
      this.router.navigate(['bank']);
    }
  }

  public async login(): Promise<void> {
    try {
      const response = await this.authService.signin(this.loginForm.value) as any;
      const { token, _doc: session } = response.data;
      this.cacheService.saveItemLocal('token', token);
      this.cacheService.saveItemLocal('session', JSON.stringify(session));

      this.authError = false;
      this.authService.newUser = false;

      this.router.navigate(['bank']);
    } catch(error) {
      console.error(error.message);
      this.authError = true;
    }
  }
}
