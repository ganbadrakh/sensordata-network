import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { WalletComponent } from './Wallet/Wallet.component';
import { AccountComponent } from './Account/Account.component';
import { AirPollutionDataComponent } from './AirPollutionData/AirPollutionData.component';
import { ExtendedDataComponent } from './ExtendedData/ExtendedData.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Wallet', component: WalletComponent},
		
		{ path: 'Account', component: AccountComponent},
		
		{ path: 'AirPollutionData', component: AirPollutionDataComponent},
		
		{ path: 'ExtendedData', component: ExtendedDataComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
