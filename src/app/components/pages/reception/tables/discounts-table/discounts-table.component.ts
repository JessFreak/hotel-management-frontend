import { TableComponent } from '../table.component';
import { DiscountsService } from '../../../../../services/discounts.service';
import { Observable } from 'rxjs';
import { Discount, DiscountPayload } from '../../../../../models/discount.model';
import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discounts-table',
  templateUrl: './discounts-table.component.html',
  standalone: true,
  styleUrl: '../../reception.component.css',
  imports: [AsyncPipe, NgForOf, NgIf, FormsModule],
})
export class DiscountsTableComponent extends TableComponent {
  discounts$: Observable<Discount[]> | null = null;
  editingDiscount: Discount | null = null;
  editedDiscount: Discount | null = null;
  newDiscount: DiscountPayload | null = null;

  constructor(private discountsService: DiscountsService) {
    super();
  }

  override loadData() {
    this.discounts$ = this.discountsService.getDiscounts();
  }

  addNewDiscount(): void {
    this.newDiscount = { name: '', percentage: 0 };
  }

  saveNewDiscount(): void {
    if (this.newDiscount) {
      this.discountsService.createDiscount(this.newDiscount).subscribe(() => {
        this.newDiscount = null;
        this.loadData();
      });
    }
  }

  cancelNewDiscount(): void {
    this.newDiscount = null;
  }

  editDiscount(discount: Discount): void {
    this.editingDiscount = discount;
    this.editedDiscount = { ...discount };
  }

  saveDiscount(): void {
    if (this.editedDiscount) {
      this.discountsService.updateDiscount(this.editedDiscount.id, this.editedDiscount).subscribe(() => {
        this.editingDiscount = null;
        this.editedDiscount = null;
        this.loadData();
      });
    }
  }

  deleteDiscount(id: string): void {
    this.discountsService.deleteDiscount(id).subscribe(() => {
      this.loadData();
    });
  }
}
