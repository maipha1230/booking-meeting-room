import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomSettingComponent } from './meeting-room-setting.component';

describe('MeetingRoomSettingComponent', () => {
  let component: MeetingRoomSettingComponent;
  let fixture: ComponentFixture<MeetingRoomSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRoomSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingRoomSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
