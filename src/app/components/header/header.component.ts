import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgOptimizedImage,
    RouterLinkActive,
  ],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor (private authService: AuthService) {}

  ngOnInit (): void {
    this.authService.setUser();
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout (): void {
    this.authService.logout();
  }
}
