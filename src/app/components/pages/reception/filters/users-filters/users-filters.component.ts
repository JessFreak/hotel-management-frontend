import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFiltersComponent } from '../filters.component';
import { UserFilters } from '../../../../../models/user.model';

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class UsersFiltersComponent extends BaseFiltersComponent<UserFilters> {}
