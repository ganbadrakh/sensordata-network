import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSBComponent } from './transaction-sb.component';

describe('TransactionSBComponent', () => {
  let component: TransactionSBComponent;
  let fixture: ComponentFixture<TransactionSBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionSBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
