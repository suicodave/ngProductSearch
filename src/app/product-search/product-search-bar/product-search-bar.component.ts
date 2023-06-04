import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-search-bar',
  templateUrl: './product-search-bar.component.html',
  styleUrls: ['./product-search-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchBarComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  @Input() disabled: boolean = false;

  searchKey: string = '';

  onSearch() {
    this.search.emit(this.searchKey);
  }
}
