import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsInQuoteComponent } from './items-in-quote.component';

describe('ItemsInQuoteComponent', () => {
  let component: ItemsInQuoteComponent;
  let fixture: ComponentFixture<ItemsInQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsInQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsInQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
