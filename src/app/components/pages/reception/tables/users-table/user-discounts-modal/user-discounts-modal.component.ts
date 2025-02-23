import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Discount } from '../../../../../../models/discount.model';
import { UsersService } from '../../../../../../services/users.service';
import { DiscountsService } from '../../../../../../services/discounts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-discounts-modal',
  templateUrl: './user-discounts-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./user-discounts-modal.component.css'],
})
export class UserDiscountsModalComponent implements OnInit {
  @Input() clientId: string | null = null;
  @Output() close = new EventEmitter<void>();
  usersDiscounts$: Observable<Discount[]> | null = null;
  allDiscounts$: Observable<Discount[]> | null = null;
  showAddDiscountInput: boolean = false;
  selectedDiscountId: string | null = null;

  constructor(
    private usersService: UsersService,
    private discountsService: DiscountsService,
  ) {}

  ngOnInit(): void {
    if (this.clientId) {
      this.usersDiscounts$ = this.usersService.getUsersDiscounts(this.clientId);
      this.allDiscounts$ = this.discountsService.getDiscounts();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  addDiscount(): void {
    this.showAddDiscountInput = true;
  }

  saveDiscount(): void {
    if (this.clientId && this.selectedDiscountId) {
      this.usersService.addDiscountToUser(this.clientId, this.selectedDiscountId).subscribe(() => {
        if (this.clientId) {
          this.usersDiscounts$ = this.usersService.getUsersDiscounts(this.clientId);
        }
        this.showAddDiscountInput = false;
        this.selectedDiscountId = null;
      });
    }
  }
}
