import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchBarComponent } from './product-search-bar.component';
import { By } from '@angular/platform-browser';

describe('ProductSearchBarComponent', () => {
  let component: ProductSearchBarComponent;
  let fixture: ComponentFixture<ProductSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSearchBarComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ProductSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when search button is clicked', () => {
    const instance = fixture.componentInstance;

    spyOn(instance.search, 'emit');

    const searchButtonHandler = fixture.debugElement.query(By.css('button'));

    searchButtonHandler.triggerEventHandler('click');

    expect(instance.search.emit).toHaveBeenCalled();
  })
});
