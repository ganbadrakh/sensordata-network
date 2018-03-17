import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { AirPollutionDataComponent } from './AirPollutionData.component';
import {AirPollutionDataService} from './AirPollutionData.service';
describe('AirPollutionDataComponent', () => {
  let component: AirPollutionDataComponent;
  let fixture: ComponentFixture<AirPollutionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirPollutionDataComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [AirPollutionDataService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirPollutionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
