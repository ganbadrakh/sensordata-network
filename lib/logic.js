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
 * Sensor data to tokens trading transaction
 * @param {org.acme.biznet.TradeAirPollutionData} tradeData
 * @transaction
 */
function TradeAirPollutionData(tradeData) {
    if(tradeData.fromWallet.balance < tradeData.amount) {
        throw new Error('Insufficient token funds!');
    }
    //update values of the wallets
    tradeData.fromWallet.balance -= tradeData.amount;
    tradeData.toWallet.balance += tradeData.amount;
      
    var airpollutiondata = tradeData.airpollutiondata;
    tradeData.airpollutiondata.owner = tradeData.newOwner;

    airpollutiondata.status = 'SOLD';
    airpollutiondata.ownerEntity = 'Buyer';

        //var position = tradeData.airpollutiondata.location;
	    //console.log('### Air pollution data received at: ' + tradeData.timestamp + 'from ' + position); 
      
    return getAssetRegistry('org.acme.biznet.AirPollutionData')
        .then(function(assetRegistry) {
            return assetRegistry.update(tradeData.airpollutiondata);
        })
        .then(function(){
            return getAssetRegistry('org.acme.biznet.Wallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([tradeData.fromWallet,tradeData.toWallet]);
            });
        });
        var tradeAirPollutionDataNotification = getFactory().newEvent('org.acme.biznet', 'TradeAirPollutionDataNotification');
        tradeAirPollutionDataNotification.airpollutiondata = tradeData.airpollutiondata;
        emit(tradeAirPollutionDataNotification);
        
        console.log('### Air pollution data with ID' + airPollutionDataId + ' sold to ' + BuyerId + '.');
}

/**
 * Air quality data to cash trading transaction
 * @param {org.acme.biznet.ProvideAirQualityData} forwardData
 * @transaction
 */
function ProvideAirQualityData(forwardData) {
    if(forwardData.fromAccound.balance < forwardData.amount) {
        throw new Error('Insufficient cash funds!');
    }
    //update values of the accounts
  	forwardData.fromAccount.balance -= forwardData.amount;
    forwardData.toAccount.balance += forwardData.amount;

    var airqualitydata = forwardData.airqualitydata;
    forwardData.airqualitydata.owner = forwardData.newOwner;

    airqualitydata.status = 'FORWARDED';
    airqualitydata.ownerEntity = 'DataConsumer';
    
    return getAssetRegistry('org.acme.biznet.AirQualityData')
        .then(function(assetRegistry) {
            return assetRegistry.update(forwardData.airqualitydata);
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

    //update values of the assets
    UpdateValues.toWallet.balance += tokensChange;
    UpdateValues.fromWallet.balance -= tokensChange;
    UpdateValues.toAccount.balance += UpdateValues.cashValue;
    UpdateValues.fromAccount.balance -= UpdateValues.cashValue;

    return getAssetRegistry('org.acme.biznet.Wallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toWallet,UpdateValues.fromWallet]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toAccount,UpdateValues.fromAccount]);
              //console.log(cashValue + ' EUR zu Tokens getauscht');
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
	
    //update values of the assets
  	UpdateValues.toAccount.balance += cashChange;
  	UpdateValues.fromAccount.balance -= cashChange;
  	UpdateValues.toWallet.balance += UpdateValues.tokenValue;
  	UpdateValues.fromWallet.balance -= UpdateValues.tokenValue;
   
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




