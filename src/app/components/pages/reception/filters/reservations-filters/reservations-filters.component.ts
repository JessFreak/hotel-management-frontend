import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFiltersComponent } from '../filters.component';
import { ReservationFilters } from '../../../../../models/reservation.model';
import { RoomService } from '../../../../../services/rooms.service';
import { Room } from '../../../../../models/room.model';
import { NgForOf } from '@angular/common';
import { User } from '../../../../../models/user.model';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-reservations-filters',
  templateUrl: './reservations-filters.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf]
})
export class ReservationsFiltersComponent extends BaseFiltersComponent<ReservationFilters> implements OnInit {
  rooms: Room[] = [];
  clients: User[] = [];
  clientName: string = '';

  constructor (
    private roomService: RoomService,
    private usersService: UserService,
  ) {
    super();
  }

  ngOnInit (): void {
    this.roomService.getRooms({})
      .subscribe((rooms) => {
        this.rooms = rooms;
      });

    this.usersService.getUsers({})
      .subscribe((clients) => {
        this.clients = clients;
      });
  }

  onClientNameChange(): void {
    const selectedClient = this.clients.find(client => {
      return `${client.firstName} ${client.lastName} ${client.passportNumber}` === this.clientName;
    });

    if (selectedClient) {
      this.filters.clientId = selectedClient.id;
    } else {
      this.filters.clientId = undefined;
    }
  }

  override clearFilters () {
    super.clearFilters();
    this.clientName = '';
  }
}
