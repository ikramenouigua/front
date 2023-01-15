import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBuyerComponent } from './notification-buyer.component';

describe('NotificationBuyerComponent', () => {
  let component: NotificationBuyerComponent;
  let fixture: ComponentFixture<NotificationBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
