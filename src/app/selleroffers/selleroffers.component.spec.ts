import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelleroffersComponent } from './selleroffers.component';

describe('SelleroffersComponent', () => {
  let component: SelleroffersComponent;
  let fixture: ComponentFixture<SelleroffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelleroffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelleroffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
