import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFiltersComponent } from '../filters.component';
import { ReservationFilters } from '../../../../../models/reservation.model';
import { RoomService } from '../../../../../services/rooms.service';
import { Room } from '../../../../../models/room.model';
import { NgForOf } from '@angular/common';
import { User } from '../../../../../models/user.model';
import { UsersService } from '../../../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

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
    private usersService: UsersService,
    private route: ActivatedRoute,
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

        const queryParams = this.route.snapshot.queryParams;

        if (queryParams['clientId']) {
          this.filters.clientId = queryParams['clientId'];
          this.applyFilters();

          const selectedClient = this.clients.find(client => client.id === queryParams['clientId']);
          if (selectedClient) {
            this.clientName = `${selectedClient.firstName} ${selectedClient.lastName} ${selectedClient.passportNumber}`;
          }
        }
      });

    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['roomNumber']) {
      this.filters.roomNumber = parseInt(queryParams['roomNumber'], 10);
      this.applyFilters();
    }
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
