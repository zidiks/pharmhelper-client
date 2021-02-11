import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSubPage } from './modal-sub.page';

describe('ModalSubPage', () => {
  let component: ModalSubPage;
  let fixture: ComponentFixture<ModalSubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
