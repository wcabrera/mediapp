import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignovitalEdicionComponent } from './signovital-edicion.component';

describe('SignovitalEdicionComponent', () => {
  let component: SignovitalEdicionComponent;
  let fixture: ComponentFixture<SignovitalEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignovitalEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignovitalEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
