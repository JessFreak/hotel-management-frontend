import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      passportNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  toggleAuth(): void {
    const targetRoute = this.isLogin ? '/register' : '/login';
    this.router.navigate([targetRoute]);
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.authService.setUser();
        this.router.navigate(['/']);
      },
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) return;

    const { firstName, lastName, middleName, passportNumber, email, password } = this.registerForm.value;
    this.authService.register({ firstName, lastName, middleName, passportNumber, email, password }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
