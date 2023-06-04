import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { ProductSearchService } from './product-search.service';
import { of, Observable } from 'rxjs';
import { Product } from './product';
import { By } from '@angular/platform-browser';
import { ProductSearchBarComponent } from './product-search-bar/product-search-bar.component';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  let searchService: any;

  const fakeProducts: Observable<Product[]> = of([
    {
      id: 1,
      title: 'Product 1',
      description: 'Test Description',
      price: 99.9,
    }
  ])

  beforeEach(() => {
    searchService = jasmine.createSpyObj('ProductSearchService', ['search'], {
      isSearching$: of(false),
      searchedProducts$: fakeProducts
    });

    TestBed.configureTestingModule({
      declarations: [ProductSearchComponent, ProductSearchBarComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ProductSearchService,
          useValue: searchService
        }
      ]
    });

    fixture = TestBed.createComponent(ProductSearchComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchService.search when onSearch is called', () => {
    const searchKey = 'Oil';

    fixture.componentInstance.onSearch('Oil');

    expect(searchService.search).toHaveBeenCalledWith(searchKey);
  })

  it('should call onSearch when the search bar emits a seach event', waitForAsync(() => {
    spyOn(fixture.componentInstance, 'onSearch');

    const searchBarHandler = fixture.debugElement.query(By.directive(ProductSearchBarComponent));

    const searchKey = 'Oil';

    searchBarHandler.triggerEventHandler('search', searchKey);

    expect(fixture.componentInstance.onSearch).toHaveBeenCalledWith(searchKey);
  }))
});
