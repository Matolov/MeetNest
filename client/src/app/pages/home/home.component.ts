import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../../components/register/register.component';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RegisterComponent]
})
export class HomeComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);

  registerMode = false;

  ngOnInit(): void {
    if (this.accountService.currentUser()) this.router.navigateByUrl('/members')
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
