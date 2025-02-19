import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RoomsComponent } from '../rooms/rooms.component';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    RoomsComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {}
