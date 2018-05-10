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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

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
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'SDTWallet', component: SDTWalletComponent},
    
		{ path: 'BTCWallet', component: BTCWalletComponent},
    
		{ path: 'Account', component: AccountComponent},
    
		{ path: 'Sensor', component: SensorComponent},
    
		{ path: 'RawData', component: RawDataComponent},
    
		{ path: 'EnrichedData', component: EnrichedDataComponent},
    
    
      { path: 'Provider', component: ProviderComponent},
      
      { path: 'Requester', component: RequesterComponent},
      
      { path: 'Consumer', component: ConsumerComponent},
      
      { path: 'Exchange', component: ExchangeComponent},
      
      
        { path: 'TransferRawData', component: TransferRawDataComponent},
        
        { path: 'TransferEnrichedData', component: TransferEnrichedDataComponent},
        
        { path: 'TradeCashToTokens', component: TradeCashToTokensComponent},
        
        { path: 'TradeCashToBTC', component: TradeCashToBTCComponent},
        
        { path: 'TradeTokensToCash', component: TradeTokensToCashComponent},
        
        { path: 'TradeTokensToBTC', component: TradeTokensToBTCComponent},
        
        { path: 'TradeBTCToTokens', component: TradeBTCToTokensComponent},
        
        { path: 'TradeBTCToCash', component: TradeBTCToCashComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
