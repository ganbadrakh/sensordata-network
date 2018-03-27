import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { WalletComponent } from './Wallet/Wallet.component';
import { AccountComponent } from './Account/Account.component';
import { AirPollutionDataComponent } from './AirPollutionData/AirPollutionData.component';
import { ExtendedDataComponent } from './ExtendedData/ExtendedData.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { DataConsumerComponent } from './data-consumer/data-consumer.component';
//import { TransactionBSComponent } from './transaction-bs/transaction-bs.component';
import { TransactionBDCComponent } from './transaction-bdc/transaction-bdc.component';
//import { TransactionSEComponent } from './transaction-se/transaction-se.component';
//import { TransactionBEComponent } from './transaction-be/transaction-be.component';
import { TransactionCTComponent } from './transaction-ct/transaction-ct.component';
import { TransactionTCComponent } from './transaction-tc/transaction-tc.component';
import { TransactionSBComponent } from './transaction-sb/transaction-sb.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    WalletComponent,
		AccountComponent,
		AirPollutionDataComponent,
		
    ExtendedDataComponent,
		
    ExchangeComponent,
		
    SellerComponent,
		
    BuyerComponent,
		
    DataConsumerComponent,
		
    //TransactionBSComponent,
		
    TransactionBDCComponent,
		
    //TransactionSEComponent,
		
    //TransactionBEComponent,
		
    TransactionCTComponent,
		
    TransactionTCComponent,
		
    TransactionSBComponent,
		
    AboutComponent
		
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
