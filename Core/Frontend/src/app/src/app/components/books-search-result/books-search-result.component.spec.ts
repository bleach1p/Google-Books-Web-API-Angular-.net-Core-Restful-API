import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSearchResultComponent } from './books-search-result.component';

describe('BooksSearchResultComponent', () => {
  let component: BooksSearchResultComponent;
  let fixture: ComponentFixture<BooksSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
