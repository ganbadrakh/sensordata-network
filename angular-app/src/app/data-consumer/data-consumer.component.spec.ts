import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConsumerComponent } from './data-consumer.component';

describe('DataConsumerComponent', () => {
  let component: DataConsumerComponent;
  let fixture: ComponentFixture<DataConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
