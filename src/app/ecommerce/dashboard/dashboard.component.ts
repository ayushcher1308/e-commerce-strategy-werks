import { Component, OnInit, effect, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { HttpUtilService } from '../../services/http-util.service';
import { HttpClientModule } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';
import { FilterSignalService } from '../../services/filter-signal.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    CardsComponent,
    HttpClientModule,
    CommonModule,
    FiltersComponent,
    LoaderComponent,
    NgbModalModule,
  ],
  providers: [HttpUtilService, NgbActiveModal],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    public httpUtilService: HttpUtilService,
    public filterSignalService: FilterSignalService
  ) {
    effect(() => {
      const newValue = this.filterSignalService.getDataSignal();
      this.filterProducts(newValue);
    });
  }

  private modalService = inject(NgbModal);

  productsData: Array<any> = [];
  originalData: Array<any> = [];
  loading = true;

  ngOnInit(): void {
    this.setLoading(true);
    this.fetchCardsData();
  }

  fetchCardsData() {
    this.httpUtilService.getHttpResponse(CONSTANTS.GET_PRODUCTS_URL).subscribe({
      next: (response: any) => {
        this.productsData = response;
        this.originalData = response;
        this.setLoading(false);
      },
      error: (error) => {
        this.setLoading(false);
        this.showError();
      },
    });
  }
  showError() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = {
      title: CONSTANTS.ERROR,
      description: CONSTANTS.HELP_MESSAGE,
    };
  }

  filterProducts(filters: any) {
    if (filters) {
      this.setLoading(true);
      this.productsData = _.cloneDeep(this.originalData);
      if (filters.sort != '') {
        const isAscending = filters.sort === 'l2h';
        this.sortProducts(isAscending);
      }
      if (filters.priceRange != '') {
        const range = filters.priceRange.split('_');
        this.filterByPriceRange(Number(range[0]), Number(range[1]));
      }
      if (filters.rating != '') {
        this.productsData = this.productsData.filter((value) => {
          return value.rating.rate >= Number(filters.rating);
        });
      }
      if (filters.category != '') {
        this.productsData = this.productsData.filter((value) => {
          return value.category == filters.category;
        });
      }
      this.setLoading(false);
    }
  }

  sortProducts(isAscending: boolean) {
    this.productsData.sort((a, b) => {
      return isAscending ? a.price - b.price : b.price - a.price;
    });
  }

  filterByPriceRange(low: number, high: number) {
    this.productsData = this.productsData.filter((value) => {
      return value.price >= low && value.price <= high;
    });
  }

  setLoading(value: boolean) {
    this.loading = value;
  }
}
