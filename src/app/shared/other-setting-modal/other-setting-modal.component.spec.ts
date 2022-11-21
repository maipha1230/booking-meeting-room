import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingModalComponent } from './other-setting-modal.component';

describe('OtherSettingModalComponent', () => {
  let component: OtherSettingModalComponent;
  let fixture: ComponentFixture<OtherSettingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
