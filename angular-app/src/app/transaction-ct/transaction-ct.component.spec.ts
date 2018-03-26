import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCTComponent } from './transaction-ct.component';

describe('TransactionCTComponent', () => {
  let component: TransactionCTComponent;
  let fixture: ComponentFixture<TransactionCTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
