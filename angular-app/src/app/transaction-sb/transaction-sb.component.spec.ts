import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSbComponent } from './transaction-sb.component';

describe('TransactionSbComponent', () => {
  let component: TransactionSbComponent;
  let fixture: ComponentFixture<TransactionSbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionSbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
