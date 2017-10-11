import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorExampleComponent } from './ckeditor-example.component';

describe('CkeditorExampleComponent', () => {
  let component: CkeditorExampleComponent;
  let fixture: ComponentFixture<CkeditorExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
