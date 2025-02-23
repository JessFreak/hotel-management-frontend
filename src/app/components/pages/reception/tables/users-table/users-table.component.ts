import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { UsersFiltersComponent } from '../../filters/users-filters/users-filters.component';
import { UserDiscountsModalComponent } from './user-discounts-modal/user-discounts-modal.component';
import { TableComponent } from '../table.component';
import { Observable } from 'rxjs';
import { User, UserFilters } from '../../../../../models/user.model';
import { Router } from '@angular/router';
import { UsersService } from '../../../../../services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  standalone: true,
  styleUrl: '../../reception.component.css',
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgForOf,
    NgIf,
    UsersFiltersComponent,
    UserDiscountsModalComponent,
    UserDiscountsModalComponent,
  ],
})
export class UsersTableComponent extends TableComponent implements OnInit {
  users$: Observable<User[]> | null = null;
  override filters: UserFilters = {};
  selectedClientId: string | null = null;
  isModalOpen: boolean = false;

  constructor (private userService: UsersService, private router: Router) {
    super();
  }

  override ngOnInit(): void {
    this.loadData();
  }

  override loadData() {
    this.users$ = this.userService.getUsers(this.filters);
  }

  navigateToReservations(clientId: string): void {
    this.router.navigate(['/reception'], { queryParams: { clientId, tab: 'reservations' } });
  }

  showUserDiscounts(userId: string): void {
    this.selectedClientId = userId;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
