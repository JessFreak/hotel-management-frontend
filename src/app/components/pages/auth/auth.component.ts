import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule]
})
export class AuthComponent implements OnInit {
  public isLogin: boolean = true;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.isLogin = urlSegments.some(segment => segment.path === 'login');
    });

    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      passportNumber: [''],
      email: [''],
      password: [''],
    });
  }

  toggleAuth(): void {
    const targetRoute = this.isLogin ? '/register' : '/login';
    this.router.navigate([targetRoute]);
  }

  onLoginSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: () => {
        localStorage.setItem('isAuthorised', 'true');
        this.authService.setUser();
        this.router.navigate(['/']);
      },
    });
  }

  onRegisterSubmit(): void {
    const { firstName, lastName, middleName, passportNumber, email, password } = this.registerForm.value;
    this.authService.register({ firstName, lastName, middleName, passportNumber, email, password }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
