import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashformComponent } from './dashform.component';

describe('DashformComponent', () => {
  let component: DashformComponent;
  let fixture: ComponentFixture<DashformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
