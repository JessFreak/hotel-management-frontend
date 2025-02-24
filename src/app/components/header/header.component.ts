import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  isMobile: boolean = false;
  isMenuOpen: boolean = false;

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {
    this.checkIsMobile();
    window.matchMedia('(max-width: 1000px)').addEventListener('change', (e) => {
      this.isMobile = e.matches;
    });
  }

  ngOnInit (): void {
    this.authService.setUser();
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout (): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  checkIsMobile() {
    this.isMobile = window.matchMedia('(max-width: 1000px)').matches;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
