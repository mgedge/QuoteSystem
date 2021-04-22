import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrchseOrderComponent } from './prchse-order.component';

describe('PrchseOrderComponent', () => {
  let component: PrchseOrderComponent;
  let fixture: ComponentFixture<PrchseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrchseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrchseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
