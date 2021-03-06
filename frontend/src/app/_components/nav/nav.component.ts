import { Observable } from 'rxjs';
import { AccountService } from '../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User>;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.accountService
      .login(this.model)
      .subscribe(() => this.router.navigateByUrl('/members'));
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
