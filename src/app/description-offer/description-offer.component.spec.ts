import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionOfferComponent } from './description-offer.component';

describe('DescriptionOfferComponent', () => {
  let component: DescriptionOfferComponent;
  let fixture: ComponentFixture<DescriptionOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
