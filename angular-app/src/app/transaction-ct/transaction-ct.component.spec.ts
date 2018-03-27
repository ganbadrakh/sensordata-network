import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCtComponent } from './transaction-ct.component';

describe('TransactionCtComponent', () => {
  let component: TransactionCtComponent;
  let fixture: ComponentFixture<TransactionCtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
