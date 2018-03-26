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

/**
 * Raw air quality data to tokens trading transaction
 * @param {org.acme.biznet.TradeAirPollutionData} tradeData
 * @transaction
 */
function TradeAirPollutionData(tradeData) {
    var airpollutiondata = tradeData.airpollutiondata;
    if(airpollutiondata.status !== 'FOR_SALE'){
        throw new Error('Raw data is not FOR_SALE!');
    } else if(tradeData.fromWallet.balance < tradeData.amount) {
        throw new Error('Insufficient token funds!');
    }
    //update values of the seller account
    console.log('#### seller token balance before: ' + tradeData.toWallet.balance);
    tradeData.toWallet.balance += tradeData.amount;
    console.log('#### seller token balance after: ' + tradeData.toWallet.balance);
    //update values of the buyer account
    console.log('#### buyer token balance before: ' + tradeData.fromWallet.balance);  
    tradeData.fromWallet.balance -= tradeData.amount;
    console.log('#### buyer token balance after: ' + tradeData.fromWallet.balance); 

    var seller = airpollutiondata.owner;
    //transfer the ownership of asset
    tradeData.airpollutiondata.owner = tradeData.newOwner;
    airpollutiondata.status = 'SOLD';
    airpollutiondata.ownerEntity = 'Buyer';

    var position = airpollutiondata.location;
    console.log('### Raw air pollution data with ID ' + airpollutiondata.airPollutionDataId + ' from ' + position + ' has transferred to ' + tradeData.newOwner); 
    console.log('### The Seller was ' + seller + ' and the Transaction successfully completed at ' + tradeData.timestamp);
      
    return getAssetRegistry('org.acme.biznet.AirPollutionData')
        .then(function(assetRegistry) {

            var tradeAirPollutionDataNotification = getFactory().newEvent('org.acme.biznet', 'TradeAirPollutionDataNotification');
            tradeAirPollutionDataNotification.airpollutiondata = tradeData.airpollutiondata;
            emit(tradeAirPollutionDataNotification);

            return assetRegistry.update(tradeData.airpollutiondata);
        })
        .then(function(){
            return getAssetRegistry('org.acme.biznet.Wallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([tradeData.fromWallet,tradeData.toWallet]);
            });
        });       
}

/**
 * Enhanced air quality data to cash trading transaction
 * @param {org.acme.biznet.ProvideExtendedData} forwardData
 * @transaction
 */
function ProvideExtendedData(forwardData) {
    var extendeddata = forwardData.extendeddata;
    var str1 = extendeddata.healthImplications;
    var str2 = extendeddata.cautionaryStatement;

    if(extendeddata.status !== 'PROCESSED' || str1 =="" || str2 =="") {
        throw new Error('Raw data is not properly PROCESSED!');
    } else if(forwardData.fromAccount.balance < forwardData.amount) {
        throw new Error('Insufficient cash funds!');
    } 
    //update values of the buyer(data provider) account
    console.log('#### buyer(data provider) cash balance before: ' + forwardData.toAccount.balance);
    forwardData.toAccount.balance += forwardData.amount;
    console.log('#### buyer(data provider) cash balance after: ' + forwardData.toAccount.balance);
    //update values of the data consumer account
    console.log('#### data consumer cash balance before: ' + forwardData.fromAccount.balance);
    forwardData.fromAccount.balance -= forwardData.amount;
    console.log('#### data consumer cash balance after: ' + forwardData.fromAccount.balance);  
    
    forwardData.extendeddata.owner = forwardData.newOwner;

    extendeddata.status = 'FORWARDED';
    extendeddata.ownerEntity = 'DataConsumer';
    
    console.log('### Enhanced air quality data with ID ' + extendeddata.extendedDataId + ' from raw data with ID ' + extendeddata.dataFrom + ' was successfully transferred to ' + forwardData.extendeddata.owner);

    return getAssetRegistry('org.acme.biznet.ExtendedData')
        .then(function(assetRegistry) {

            var provideExtendedDataNotification = getFactory().newEvent('org.acme.biznet', 'ProvideExtendedDataNotification');
            provideExtendedDataNotification.extendeddata = forwardData.extendeddata;
            emit(provideExtendedDataNotification);

            return assetRegistry.update(forwardData.extendeddata);
        })
  		.then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            	.then(function (assetRegistry) {
                	return assetRegistry.updateAll([forwardData.toAccount,forwardData.fromAccount]);
            	});  
        });       
}

/**
 * Cash to tokens transaction
 * @param {org.acme.biznet.ExchangeCashToTokens} UpdateValues
 * @transaction
 */
function ExchangeCashToTokens(UpdateValues) {
	
    //determine change in tokens value from the rate
    var tokensChange = (UpdateValues.cashRate * UpdateValues.cashValue);

    if(UpdateValues.fromAccount.balance < UpdateValues.cashValue) {
    	throw new Error('Insufficient cash funds!');
    } else if (tokensChange > UpdateValues.fromWallet.balance) {
        throw new Error('Not enough tokens for this transaction!'); 
    }
    //alert("Fehler!");

    //update values of exchanger1 cash account
    console.log('#### exchanger1 cash balance before: ' + UpdateValues.fromAccount.balance);
    UpdateValues.fromAccount.balance -= UpdateValues.cashValue;
    console.log('#### exchanger1 cash balance after: ' + UpdateValues.fromAccount.balance);
    //update values of exchanger2 cash account
    console.log('#### exchanger2 cash balance before: ' + UpdateValues.toAccount.balance);
    UpdateValues.toAccount.balance += UpdateValues.cashValue;
    console.log('#### exchanger2 cash balance after: ' + UpdateValues.toAccount.balance);
    //update values of exchanger1 token wallet
    console.log('#### exchanger1 token balance before: ' + UpdateValues.toWallet.balance);
    UpdateValues.toWallet.balance += tokensChange;
    console.log('#### exchanger1 token balance after: ' + UpdateValues.toWallet.balance);
    //update values of exchanger2 token wallet
    console.log('#### exchanger2 token balance before: ' + UpdateValues.fromWallet.balance);
    UpdateValues.fromWallet.balance -= tokensChange;
    console.log('#### exchanger2 token balance after: ' + UpdateValues.fromWallet.balance);
    
    console.log(UpdateValues.cashValue + ' EUR exchanged to ' + tokensChange + ' SDT Tokens with actual rate of ' + UpdateValues.cashRate);

    return getAssetRegistry('org.acme.biznet.Wallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toWallet,UpdateValues.fromWallet]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toAccount,UpdateValues.fromAccount]); 
            });            
        });     
}

/**
 * Tokens to cash transaction
 * @param {org.acme.biznet.ExchangeTokensToCash} UpdateValues
 * @transaction
 */
function ExchangeTokensToCash(UpdateValues) {

    //determine change in cash value from the rate
    var cashChange = (UpdateValues.tokenRate * UpdateValues.tokenValue);
    
    if(UpdateValues.fromWallet.balance < UpdateValues.tokenValue) {
        throw new Error('Not enough tokens for this transaction!');
    } else if(cashChange > UpdateValues.fromAccount.balance) {
        throw new Error('Insufficient cash funds!');
    }
    //update values of exchanger1 token wallet
    console.log('#### exchanger1 token balance before: ' + UpdateValues.fromWallet.balance);
    UpdateValues.fromWallet.balance -= UpdateValues.tokenValue;
    console.log('#### exchanger1 token balance after: ' + UpdateValues.fromWallet.balance);
    //update values of exchanger2 token wallet
    console.log('#### exchanger2 token balance before: ' + UpdateValues.toWallet.balance);
    UpdateValues.toWallet.balance += UpdateValues.tokenValue;
    console.log('#### exchanger2 token balance after: ' + UpdateValues.toWallet.balance);
    //update values of exchanger1 cash account
    console.log('#### exchanger1 cash balance before: ' + UpdateValues.toAccount.balance);
    UpdateValues.toAccount.balance += cashChange;
    console.log('#### exchanger1 cash balance after: ' + UpdateValues.toAccount.balance);
    //update values of echanger2 cash account
    console.log('#### exchanger2 cash balance before: ' + UpdateValues.fromAccount.balance);  
    UpdateValues.fromAccount.balance -= cashChange;
    console.log('#### exchanger2 cash balance after: ' + UpdateValues.fromAccount.balance);  
      
    console.log(UpdateValues.tokenValue + ' SDT Tokens exchanged to ' + cashChange + ' EUR with actual rate of ' + UpdateValues.tokenRate);

    return getAssetRegistry('org.acme.biznet.Account')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toAccount,UpdateValues.fromAccount]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.Wallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toWallet,UpdateValues.fromWallet]);
            });            
        });     
}
