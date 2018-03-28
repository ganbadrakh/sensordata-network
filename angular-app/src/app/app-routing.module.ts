import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ConsumerComponent } from './consumer/consumer.component';

import { WalletComponent } from './Wallet/Wallet.component';
import { AccountComponent } from './Account/Account.component';
import { AirPollutionDataComponent } from './AirPollutionData/AirPollutionData.component';
import { ExtendedDataComponent } from './ExtendedData/ExtendedData.component';

import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		{path: 'About', component: AboutComponent},

		{ path: 'Seller', component: SellerComponent},
		{ path: 'Buyer', component: BuyerComponent},
		{ path: 'Exchange', component: ExchangeComponent},
		{ path: 'Consumer', component: ConsumerComponent},

		{ path: 'Wallet', component: WalletComponent},
		{ path: 'Account', component: AccountComponent},
		{ path: 'AirPollutionData', component: AirPollutionDataComponent},
		{ path: 'ExtendedData', component: ExtendedDataComponent},

		{ path: 'AllTransactions', component: AllTransactionsComponent },

		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
