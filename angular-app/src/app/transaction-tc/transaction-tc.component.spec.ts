import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTcComponent } from './transaction-tc.component';

describe('TransactionTcComponent', () => {
  let component: TransactionTcComponent;
  let fixture: ComponentFixture<TransactionTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
