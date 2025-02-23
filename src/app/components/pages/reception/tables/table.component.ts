import { Directive, OnInit } from '@angular/core';

@Directive()
export abstract class TableComponent implements OnInit {
  filters = {};

  ngOnInit () {
    this.loadData();
  }

  abstract loadData(): void;

  clearFilters () {
    this.filters = {};
    this.loadData();
  }
}
