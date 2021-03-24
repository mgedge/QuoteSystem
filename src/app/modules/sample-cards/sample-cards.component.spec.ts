import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCardsComponent } from './sample-cards.component';

describe('SampleCardsComponent', () => {
  let component: SampleCardsComponent;
  let fixture: ComponentFixture<SampleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
