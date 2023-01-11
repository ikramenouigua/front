import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashsellerComponent } from './dashseller.component';

describe('DashsellerComponent', () => {
  let component: DashsellerComponent;
  let fixture: ComponentFixture<DashsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashsellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
