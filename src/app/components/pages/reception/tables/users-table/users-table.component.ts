import { Component } from '@angular/core';
import { TableComponent } from '../table.component';
import { UserService } from '../../../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../models/user.model';
import { AsyncPipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { UsersFiltersComponent } from '../../filters/users-filters/users-filters.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [
    AsyncPipe,
    NgForOf,
    TitleCasePipe,
    UsersFiltersComponent,
    NgIf
  ],
  templateUrl: './users-table.component.html',
  standalone: true,
  styleUrl: '../../reception.component.css',
})
export class UsersTableComponent extends TableComponent {
  users$: Observable<User[]> | null = null;

  constructor (
    private userService: UserService,
    private router: Router,
  ) {
    super();
  }

  override loadData () {
    this.users$ = this.userService.getUsers(this.filters);
  }

  navigateToReservations(clientId: string): void {
    this.router.navigate(['/reception'], { queryParams: { clientId, tab: 'reservations' } });
  }
}
