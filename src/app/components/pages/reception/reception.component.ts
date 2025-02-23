import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomsTableComponent } from './tables/rooms-table/rooms-table.component';
import { UsersTableComponent } from './tables/users-table/users-table.component';
import { ReservationsTableComponent } from './tables/reservations-table/reservations-table.component';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  standalone: true,
  imports: [CommonModule, RoomsTableComponent, UsersTableComponent, ReservationsTableComponent],
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  tab: string = '';

  constructor (private route: ActivatedRoute) {}

  ngOnInit () {
    this.route.queryParams.subscribe(params => {
      this.tab = params['tab'];
    });
  }

}
