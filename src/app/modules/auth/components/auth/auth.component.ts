import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  readonly CHILDREN_PATHS = ['/auth/login', '/auth/register'];

  isLogin: boolean = true;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogin = this.CHILDREN_PATHS[0] === this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
    ).subscribe((event: any) => {
      this.isLogin = this.CHILDREN_PATHS[0] === event.url;
    });


  }

  navigate(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

}
