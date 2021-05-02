import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  readonly ALLOW_ROUTES = ['https://bast.dev/api/banks.php'];

  constructor(
    private router: Router,
    private cacheService: CacheService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.ALLOW_ROUTES.includes(req.url)) {
      return next.handle(req);
    }
    const token = this.cacheService.getItemLocal('token');
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          'auth-token': token,
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if ([401, 400].includes(err.status)) {
          this.router.navigate(['auth']);
        }

        return throwError(err);

      })
    );
  }
}
