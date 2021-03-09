import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuoteComponent } from './edit-quote.component';

describe('EditQuoteComponent', () => {
  let component: EditQuoteComponent;
  let fixture: ComponentFixture<EditQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
