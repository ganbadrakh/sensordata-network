import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBdComponent } from './transaction-bd.component';

describe('TransactionBdComponent', () => {
  let component: TransactionBdComponent;
  let fixture: ComponentFixture<TransactionBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
