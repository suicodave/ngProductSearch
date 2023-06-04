import { map, startWith } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductSearchService } from './product-search.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchComponent {

  viewModel$ = combineLatest([
    this.searchService.isSearching$,
    this.searchService.searchedProducts$.pipe(
      startWith([])
    )
  ]).pipe(
    map(([isSearching, searchedProducts]) => ({ isSearching, searchedProducts }))
  );

  constructor(private searchService: ProductSearchService) { }

  onSearch(searchKey: string) {
    this.searchService.search(searchKey);
  }

}
