import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleGraphqlComponent } from './sample-graphql.component';

describe('SampleGraphqlComponent', () => {
  let component: SampleGraphqlComponent;
  let fixture: ComponentFixture<SampleGraphqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleGraphqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
