import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  isOpen = false;
  user;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  open() {
    this.isOpen = !this.isOpen;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
