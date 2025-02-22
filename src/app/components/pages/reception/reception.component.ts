import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Room } from '../../../models/room.model';
import { Reservation } from '../../../models/reservation.model';
import { ReservationsService } from '../../../services/reservations.service';
import { RoomService } from '../../../services/rooms.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  standalone: true,
  imports: [TitleCasePipe, CommonModule, RouterLink],
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  tab: string = '';
  users$: Observable<User[]> | null = null;
  rooms$: Observable<Room[]> | null = null;
  reservations$: Observable<Reservation[]> | null = null;
  isLoading: boolean = true;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    private roomService: RoomService,
    private reservationsService: ReservationsService,
  ) {}

  ngOnInit () {
    this.route.queryParams.subscribe(params => {
      this.tab = params['tab'];
      this.loadData();
    });
  }

  loadData () {
    this.isLoading = true;
    this.dataLoader[this.tab]();
    this.isLoading = false;
  }

  dataLoader: { [key: string]: () => void } = {
    users: () => this.users$ = this.userService.getUsers(),
    rooms: () => this.rooms$ = this.roomService.getRooms({}),
    reservations: () => this.reservations$ = this.reservationsService.getReservations({}),
  };

}
