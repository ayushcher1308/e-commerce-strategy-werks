import { Component, OnInit } from '@angular/core';
import { FilterSignalService } from '../../services/filter-signal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CONSTANTS } from '../../utils/constants';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  constructor(public filterSignalService: FilterSignalService) {}
  ngOnInit(): void {
    CONSTANTS.CATEGORIES.forEach((value) => {
      this.categoriesFilter.push({
        name: value,
        value,
      });
    });
  }

  categoriesFilter = [
    {
      name: 'All',
      value: '',
    },
  ];

  defaultFilters: any = {
    sort: '',
    priceRange: '',
    rating: '',
    category: '',
  };

  priceRangeOptions = CONSTANTS.PRICE_RANGE;

  ratings = CONSTANTS.RATINGS;

  category = [
    {
      name: 'All',
      value: '',
    },
    {},
  ];

  optionChange(key: string, event: any) {
    this.sendSignalObj(key, event.target.value);
  }

  sendSignalObj(key: any, value: any) {
    this.defaultFilters[key] = value;
    this.filterSignalService.setData(this.defaultFilters);
  }
}
