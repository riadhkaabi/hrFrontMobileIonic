import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrattendancePage } from './qrattendance.page';

describe('QrattendancePage', () => {
  let component: QrattendancePage;
  let fixture: ComponentFixture<QrattendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrattendancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrattendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
