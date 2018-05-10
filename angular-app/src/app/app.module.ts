/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { SDTWalletComponent } from './SDTWallet/SDTWallet.component';
import { BTCWalletComponent } from './BTCWallet/BTCWallet.component';
import { AccountComponent } from './Account/Account.component';
import { SensorComponent } from './Sensor/Sensor.component';
import { RawDataComponent } from './RawData/RawData.component';
import { EnrichedDataComponent } from './EnrichedData/EnrichedData.component';


  import { ProviderComponent } from './Provider/Provider.component';
  import { RequesterComponent } from './Requester/Requester.component';
  import { ConsumerComponent } from './Consumer/Consumer.component';
  import { ExchangeComponent } from './Exchange/Exchange.component';


  import { TransferRawDataComponent } from './TransferRawData/TransferRawData.component';
  import { TransferEnrichedDataComponent } from './TransferEnrichedData/TransferEnrichedData.component';
  import { TradeCashToTokensComponent } from './TradeCashToTokens/TradeCashToTokens.component';
  import { TradeCashToBTCComponent } from './TradeCashToBTC/TradeCashToBTC.component';
  import { TradeTokensToCashComponent } from './TradeTokensToCash/TradeTokensToCash.component';
  import { TradeTokensToBTCComponent } from './TradeTokensToBTC/TradeTokensToBTC.component';
  import { TradeBTCToTokensComponent } from './TradeBTCToTokens/TradeBTCToTokens.component';
  import { TradeBTCToCashComponent } from './TradeBTCToCash/TradeBTCToCash.component';
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    SDTWalletComponent,
    BTCWalletComponent,
    AccountComponent,
    SensorComponent,
    RawDataComponent,
    
    EnrichedDataComponent
    ,

    ProviderComponent,
      RequesterComponent,
      ConsumerComponent,
      
      ExchangeComponent
      ,

    TransferRawDataComponent,
        TransferEnrichedDataComponent,
        TradeCashToTokensComponent,
        TradeCashToBTCComponent,
        TradeTokensToCashComponent,
        TradeTokensToBTCComponent,
        TradeBTCToTokensComponent,
        
        TradeBTCToCashComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
