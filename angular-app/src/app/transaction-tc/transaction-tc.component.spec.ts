import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTCComponent } from './transaction-tc.component';

describe('TransactionTCComponent', () => {
  let component: TransactionTCComponent;
  let fixture: ComponentFixture<TransactionTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
