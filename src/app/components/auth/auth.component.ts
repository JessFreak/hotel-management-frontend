import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [
    NgIf,
  ],
  standalone: true
})
export class AuthComponent implements OnInit {
  public isLogin: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.isLogin = urlSegments.some(segment => segment.path === 'login');
    });
  }

  toggleAuth(): void {
    const targetRoute = this.isLogin ? '/register' : '/login';
    this.router.navigate([targetRoute]);
  }
}
