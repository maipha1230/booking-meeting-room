import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailModalComponent } from './booking-detail-modal.component';

describe('BookingDetailModalComponent', () => {
  let component: BookingDetailModalComponent;
  let fixture: ComponentFixture<BookingDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
