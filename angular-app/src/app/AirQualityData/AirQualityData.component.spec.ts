import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { AirQualityDataComponent } from './AirQualityData.component';
import {AirQualityDataService} from './AirQualityData.service';
describe('AirQualityDataComponent', () => {
  let component: AirQualityDataComponent;
  let fixture: ComponentFixture<AirQualityDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirQualityDataComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [AirQualityDataService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirQualityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
