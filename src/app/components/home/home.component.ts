import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RoomsVariantsComponent } from '../rooms/variants/rooms-variants.component';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    RoomsVariantsComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {}
