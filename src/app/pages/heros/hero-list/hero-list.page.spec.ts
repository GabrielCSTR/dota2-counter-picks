import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeroListPage } from './hero-list.page';

describe('HeroListPage', () => {
  let component: HeroListPage;
  let fixture: ComponentFixture<HeroListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
