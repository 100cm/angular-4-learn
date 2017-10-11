import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GayAndHeroComponent } from './gay-and-hero.component';

describe('GayAndHeroComponent', () => {
  let component: GayAndHeroComponent;
  let fixture: ComponentFixture<GayAndHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GayAndHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GayAndHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
