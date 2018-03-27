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
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AboutComponent } from './about/about.component';
import { TransactionSbComponent } from './transaction-sb/transaction-sb.component';
import { TransactionBdComponent } from './transaction-bd/transaction-bd.component';
import { TransactionTcComponent } from './transaction-tc/transaction-tc.component';
import { TransactionCtComponent } from './transaction-ct/transaction-ct.component';
import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    WalletComponent,
		AccountComponent,
		AirPollutionDataComponent,

    ExtendedDataComponent,

    SellerComponent,

    BuyerComponent,

    ConsumerComponent,

    ExchangeComponent,

    AboutComponent,

    TransactionSbComponent,

    TransactionBdComponent,

    TransactionTcComponent,

    TransactionCtComponent,

    AllTransactionsComponent

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
