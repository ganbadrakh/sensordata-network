import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { WalletComponent } from './Wallet/Wallet.component';
import { AccountComponent } from './Account/Account.component';
import { WeatherDataComponent } from './WeatherData/WeatherData.component';
import { AirPollutionDataComponent } from './AirPollutionData/AirPollutionData.component';
import { WeatherForecastComponent } from './WeatherForecast/WeatherForecast.component';
import { AirQualityDataComponent } from './AirQualityData/AirQualityData.component';

import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';
import { SellerComponent } from './Seller/Seller.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
	AboutComponent,
    // TransactionComponent,
    WalletComponent,
		AccountComponent,
		WeatherDataComponent,
		AirPollutionDataComponent,
		WeatherForecastComponent,
		
    AirQualityDataComponent,
	AllTransactionsComponent,
	SellerComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
