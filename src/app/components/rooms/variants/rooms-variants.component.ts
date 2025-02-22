import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-variants',
  templateUrl: './rooms-variants.component.html',
  standalone: true,
  styleUrl: './rooms-variants.component.css'
})
export class RoomsVariantsComponent {
  constructor(private router: Router) {}

  navigateWithType(type: string): void {
    this.router.navigate(['/reservation'], { queryParams: { type } });
  }
}
