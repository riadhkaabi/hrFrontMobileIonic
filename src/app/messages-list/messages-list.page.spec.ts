import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesListPage } from './messages-list.page';

describe('MessagesListPage', () => {
  let component: MessagesListPage;
  let fixture: ComponentFixture<MessagesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
