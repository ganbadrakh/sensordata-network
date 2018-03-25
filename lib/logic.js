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
        
        console.log('### Air pollution data with ID' + airpollutiondata.airPollutionDataId + ' sold to ' + airpollutiondata.BuyerId + '.');
}

/**
 * Air quality data to cash trading transaction
 * @param {org.acme.biznet.ProvideExtendedData} forwardData
 * @transaction
 */
function ProvideExtendedData(forwardData) {
    if(forwardData.fromAccount.balance < forwardData.amount) {
        throw new Error('Insufficient cash funds!');
    }
    //update values of the accounts
  	forwardData.fromAccount.balance -= forwardData.amount;
    forwardData.toAccount.balance += forwardData.amount;

    var extendeddata = forwardData.extendeddata;
    forwardData.extendeddata.owner = forwardData.newOwner;

    extendeddata.status = 'FORWARDED';
    extendeddata.ownerEntity = 'DataConsumer';
    
    return getAssetRegistry('org.acme.biznet.ExtendedData')
        .then(function(assetRegistry) {
            return assetRegistry.update(forwardData.extendeddata);
        })
  		.then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            	.then(function (assetRegistry) {
                	return assetRegistry.updateAll([forwardData.toAccount,forwardData.fromAccount]);
            	});  
        });
        var provideExtendedDataNotification = getFactory().newEvent('org.acme.biznet', 'ProvideExtendedDataNotification');
        provideExtendedDataNotification.extendeddata = forwardData.extendeddata;
        emit(provideExtendedDataNotification);
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
    } else 
     	if (tokensChange > UpdateValues.fromWallet.balance) {
     		 throw new Error('Not enough tokens for this transaction!'); 
    }
    //alert("Fehler!");

    //update values of the assets
    UpdateValues.fromAccount.balance -= UpdateValues.cashValue;
    UpdateValues.toAccount.balance += UpdateValues.cashValue;
    UpdateValues.toWallet.balance += tokensChange;
    UpdateValues.fromWallet.balance -= tokensChange;
    
    return getAssetRegistry('org.acme.biznet.Wallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toWallet,UpdateValues.fromWallet]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toAccount,UpdateValues.fromAccount]);
              //console.log(tokensChange.cashValue + ' EUR zu Tokens getauscht');
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
    } else
        if(cashChange > UpdateValues.fromAccount.balance) {
            throw new Error('Insufficient cash funds!');
        }
    //update values of the assets
    UpdateValues.fromWallet.balance -= UpdateValues.tokenValue;
    UpdateValues.toWallet.balance += UpdateValues.tokenValue;
  	UpdateValues.toAccount.balance += cashChange;
  	UpdateValues.fromAccount.balance -= cashChange;
  	
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




