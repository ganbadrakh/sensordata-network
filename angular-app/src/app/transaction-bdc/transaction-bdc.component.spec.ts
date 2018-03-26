import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBDCComponent } from './transaction-bdc.component';

describe('TransactionBDCComponent', () => {
  let component: TransactionBDCComponent;
  let fixture: ComponentFixture<TransactionBDCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBDCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
