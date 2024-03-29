import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingComponent } from './other-setting.component';

describe('OtherSettingComponent', () => {
  let component: OtherSettingComponent;
  let fixture: ComponentFixture<OtherSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
