import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  readonly defaultSearchConfig: SearchConfig = {
    searchKey: '',
    shouldSearch: false
  }

  private onSearch = new BehaviorSubject<SearchConfig>(this.defaultSearchConfig);

  onSearch$ = this.onSearch.asObservable();

  isSearching$ = this.onSearch$.pipe(
    map(searchConfig => searchConfig.shouldSearch)
  );

  searchedProducts$: Observable<Product[]> = this.onSearch$.pipe(
    filter(searchConfig => searchConfig.searchKey.length > 0 && searchConfig.shouldSearch),
    switchMap((searchConfig) => {
      return this.searchProducts(searchConfig.searchKey);
    }),
    tap(_ => this.stopSearch())
  )

  constructor(private http: HttpClient) { }

  private stopSearch() {
    this.onSearch.next(this.defaultSearchConfig);
  }

  search(searchKey: string) {
    this.onSearch.next({
      searchKey: searchKey,
      shouldSearch: true
    });
  }

  searchProducts(searchKey: string): Observable<Product[]> {
    // docs: https://dummyjson.com/docs/products

    const url = `https://dummyjson.com/products/search?q=${searchKey}`;

    return this.http.get<Product[]>(url)
      .pipe(
        map((x: any) => x.products)
      );
  }
}

interface SearchConfig {
  shouldSearch: boolean,
  searchKey: string
}
