'use strict';
/**
 * Raw air quality data to tokens trading transaction
 * @param {org.acme.biznet.TransferRawData} transfer
 * @transaction
 */
function TransferRawData(transfer) {
    var rawdata = transfer.rawdata;
    if(rawdata.status !== 'FOR_SALE'){
        throw new Error('Raw sensor data is not FOR SALE!');
    } else if(transfer.fromSDT.balance < transfer.price) {
        throw new Error('Insufficient token funds in your SDT Wallet!');
    } else if(1.99 > transfer.price) {
        throw new Error('Dataset costs 2 SDT Token!');
    } else {
   
    //update values of the Provider account
    console.log('#### Provider SDT token balance before: ' + transfer.toSDT.balance);
    transfer.toSDT.balance += transfer.price;
    console.log('#### Provider SDT token balance after: ' + transfer.toSDT.balance);
    //update values of the Requester account
    console.log('#### Requester SDT token balance before: ' + transfer.fromSDT.balance);  
    transfer.fromSDT.balance -= transfer.price;
    console.log('#### Requester SDT token balance after: ' + transfer.fromSDT.balance); 
	
    //transfer the ownership of asset
    transfer.rawdata.owner = transfer.newOwner;
    rawdata.status = 'SOLD';

    var position = rawdata.position;
    var sensorOwner = rawdata.owner;  
    console.log('### Raw air pollution data with ID ' + rawdata.RawDataId + ' from ' + position + ' has transferred to ' + transfer.newOwner); 
    console.log('### The Seller was ' + sensorOwner + ' and the transaction successfully completed at ' + transfer.timestamp);
      
    return getAssetRegistry('org.acme.biznet.RawData')
        .then(function(assetRegistry) {
			var TransferRawDataNotification = getFactory().newEvent('org.acme.biznet', 'TransferRawDataNotification');
            TransferRawDataNotification.rawdata = transfer.rawdata;
            emit(TransferRawDataNotification);
			return assetRegistry.update(transfer.rawdata);
        })
        .then(function(){
            return getAssetRegistry('org.acme.biznet.SDTWallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([transfer.fromSDT,transfer.toSDT]);
            });
        });  
    }
}
/**
 * Enhanced air quality data to cash trading transaction
 * @param {org.acme.biznet.TransferEnrichedData} transfer
 * @transaction
 */
function TransferEnrichedData(transfer) {
    var enricheddata = transfer.enricheddata;
    var str1 = enricheddata.healthImplications;
    var str2 = enricheddata.cautionaryStatement;

    if(enricheddata.status !== 'PROCESSED' || str1 =="" || str2 =="") {
        throw new Error('Raw data is not properly PROCESSED!');
    } else if(transfer.fromCash.balance < transfer.price) {
        throw new Error('Insufficient cash funds!');
    } else {
    //update values of the Requester account
    console.log('#### Requester cash balance before: ' + transfer.toCash.balance);
    transfer.toCash.balance += transfer.price;
    console.log('#### Requester cash balance after: ' + transfer.toCash.balance);
    //update values of the Consumer account
    console.log('#### data consumer cash balance before: ' + transfer.fromCash.balance);
    transfer.fromCash.balance -= transfer.price;
    console.log('#### data consumer cash balance after: ' + transfer.fromCash.balance);  
    
    transfer.enricheddata.owner = transfer.newOwner;
    enricheddata.status = 'FORWARDED';   
    console.log('### Enriched air quality data with ID ' + enricheddata.EnrichedDataId + ' from raw data with ID ' + enricheddata.fromRawData + ' was successfully transferred to ' + transfer.newOwner);

    return getAssetRegistry('org.acme.biznet.EnrichedData')
        .then(function(assetRegistry) {
			var TransferEnrichedDataNotification = getFactory().newEvent('org.acme.biznet', 'TransferEnrichedDataNotification');
        	TransferEnrichedDataNotification.enricheddata = transfer.enricheddata;
        	emit(TransferEnrichedDataNotification);
      		return assetRegistry.update(transfer.enricheddata);
        })
  		.then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            	.then(function (assetRegistry) {
                	return assetRegistry.updateAll([transfer.toCash,transfer.fromCash]);
            	});  
        });  
    }
}
/**
 * Cash to tokens transaction
 * @param {org.acme.biznet.TradeCashToTokens} UpdateValues
 * @transaction
 */
function TradeCashToTokens(UpdateValues) {
	
    //determine change in tokens from the rate
    var tokensChange = (UpdateValues.cashRate * UpdateValues.cashValue);

    if(UpdateValues.fromCash.balance < UpdateValues.cashValue) {
    	throw new Error('Insufficient cash funds!');
    } else if (tokensChange > UpdateValues.fromSDT.balance) {
        throw new Error('Not enough SDT tokens for this transaction!'); 
    } else {
    //alert("Fehler!");
    //update values of exchanger1 cash account
    console.log('#### exchanger1 cash balance before: ' + UpdateValues.fromCash.balance);
    UpdateValues.fromCash.balance -= UpdateValues.cashValue;
    console.log('#### exchanger1 cash balance after: ' + UpdateValues.fromCash.balance);
    //update values of exchanger2 cash account
    console.log('#### exchanger2 cash balance before: ' + UpdateValues.toCash.balance);
    UpdateValues.toCash.balance += UpdateValues.cashValue;
    console.log('#### exchanger2 cash balance after: ' + UpdateValues.toCash.balance);
    //update values of exchanger1 SDT token wallet
    console.log('#### exchanger1 SDT token balance before: ' + UpdateValues.toSDT.balance);
    UpdateValues.toSDT.balance += tokensChange;
    console.log('#### exchanger1 SDT token balance after: ' + UpdateValues.toSDT.balance);
    //update values of exchanger2 SDT token wallet
    console.log('#### exchanger2 SDT token balance before: ' + UpdateValues.fromSDT.balance);
    UpdateValues.fromSDT.balance -= tokensChange;
    console.log('#### exchanger2 SDT token balance after: ' + UpdateValues.fromSDT.balance);
    console.log(UpdateValues.cashValue + ' EUR exchanged to ' + tokensChange + ' SDT Tokens with actual rate of ' + UpdateValues.cashRate);

    return getAssetRegistry('org.acme.biznet.SDTWallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toSDT,UpdateValues.fromSDT]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toCash,UpdateValues.fromCash]); 
            });            
        });  
    }
}
/**
 * Cash to BTC transaction
 * @param {org.acme.biznet.TradeCashToBTC} UpdateValues
 * @transaction
 */
function TradeCashToBTC(UpdateValues) {
	
    //determine change in BTC from the rate
    var coinsChange = (UpdateValues.cashRate * UpdateValues.cashValue);

    if(UpdateValues.fromCash.balance < UpdateValues.cashValue) {
    	throw new Error('Insufficient cash funds!');
    } else if (coinsChange > UpdateValues.fromBTC.balance) {
        throw new Error('Not enough BTC for this transaction!'); 
    } else {
    //update values of exchanger1 cash account
    console.log('#### exchanger1 cash balance before: ' + UpdateValues.fromCash.balance);
    UpdateValues.fromCash.balance -= UpdateValues.cashValue;
    console.log('#### exchanger1 cash balance after: ' + UpdateValues.fromCash.balance);
    //update values of exchanger2 cash account
    console.log('#### exchanger2 cash balance before: ' + UpdateValues.toCash.balance);
    UpdateValues.toCash.balance += UpdateValues.cashValue;
    console.log('#### exchanger2 cash balance after: ' + UpdateValues.toCash.balance);
    //update values of exchanger1 BTC wallet
    console.log('#### exchanger1 BTC balance before: ' + UpdateValues.toBTC.balance);
    UpdateValues.toBTC.balance += coinsChange;
    console.log('#### exchanger1 BTC balance after: ' + UpdateValues.toBTC.balance);
    //update values of exchanger2 BTC wallet
    console.log('#### exchanger2 BTC balance before: ' + UpdateValues.fromBTC.balance);
    UpdateValues.fromBTC.balance -= coinsChange;
    console.log('#### exchanger2 BTC balance after: ' + UpdateValues.fromBTC.balance);
    console.log(UpdateValues.cashValue + ' EUR exchanged to ' + coinsChange + ' BTC with actual rate of ' + UpdateValues.cashRate);

    return getAssetRegistry('org.acme.biznet.BTCWallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toBTC,UpdateValues.fromBTC]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toCash,UpdateValues.fromCash]); 
            });            
        });  
    }
}
/**
 * Tokens to cash transaction
 * @param {org.acme.biznet.TradeTokensToCash} UpdateValues
 * @transaction
 */
function TradeTokensToCash(UpdateValues) {
	
    //determine change in cash value from the rate
    var cashChange = (UpdateValues.tokenRate * UpdateValues.tokenValue);
    
    if(UpdateValues.fromSDT.balance < UpdateValues.tokenValue) {
        throw new Error('Not enough SDT tokens for this transaction!');
    } else if(cashChange > UpdateValues.fromCash.balance) {
        throw new Error('Insufficient cash funds!');
    } else {
    //update values of exchanger1 SDT token wallet
    console.log('#### exchanger1 token balance before: ' + UpdateValues.fromSDT.balance);
    UpdateValues.fromSDT.balance -= UpdateValues.tokenValue;
    console.log('#### exchanger1 token balance after: ' + UpdateValues.fromSDT.balance);
    //update values of exchanger2 SDT token wallet
    console.log('#### exchanger2 token balance before: ' + UpdateValues.toSDT.balance);
    UpdateValues.toSDT.balance += UpdateValues.tokenValue;
    console.log('#### exchanger2 token balance after: ' + UpdateValues.toSDT.balance);
    //update values of exchanger1 cash account
    console.log('#### exchanger1 cash balance before: ' + UpdateValues.toCash.balance);
    UpdateValues.toCash.balance += cashChange;
    console.log('#### exchanger1 cash balance after: ' + UpdateValues.toCash.balance);
    //update values of echanger2 cash account
    console.log('#### exchanger2 cash balance before: ' + UpdateValues.fromCash.balance);  
    UpdateValues.fromCash.balance -= cashChange;
    console.log('#### exchanger2 cash balance after: ' + UpdateValues.fromCash.balance);  
    console.log(UpdateValues.tokenValue + ' SDT Tokens exchanged to ' + cashChange + ' EUR with actual rate of ' + UpdateValues.tokenRate);
	  
    return getAssetRegistry('org.acme.biznet.Account')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toCash,UpdateValues.fromCash]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.SDTWallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toSDT,UpdateValues.fromSDT]);
            });            
        });  
    }
}

/**
 * Tokens to BTC transaction
 * @param {org.acme.biznet.TradeTokensToBTC} UpdateValues
 * @transaction
 */
function TradeTokensToBTC(UpdateValues) {
	  	
    //determine change in BTC from the rate
    var coinsChange = (UpdateValues.tokenRate * UpdateValues.tokenValue);
    
    if(UpdateValues.fromSDT.balance < UpdateValues.tokenValue) {
        throw new Error('Not enough tokens for this transaction!');
    } else if(coinsChange > UpdateValues.fromBTC.balance) {
        throw new Error('Insufficient BTC funds!');
    } else {
    //update values of exchanger1 SDT token wallet
    console.log('#### exchanger1 token balance before: ' + UpdateValues.fromSDT.balance);
    UpdateValues.fromSDT.balance -= UpdateValues.tokenValue;
    console.log('#### exchanger1 token balance after: ' + UpdateValues.fromSDT.balance);
    //update values of exchanger2 SDT token wallet
    console.log('#### exchanger2 token balance before: ' + UpdateValues.toSDT.balance);
    UpdateValues.toSDT.balance += UpdateValues.tokenValue;
    console.log('#### exchanger2 token balance after: ' + UpdateValues.toSDT.balance);
    //update values of exchanger1 BTC wallet
    console.log('#### exchanger1 BTC balance before: ' + UpdateValues.toBTC.balance);
    UpdateValues.toBTC.balance += coinsChange;
    console.log('#### exchanger1 BTC balance after: ' + UpdateValues.toBTC.balance);
    //update values of echanger2 BTC wallet
    console.log('#### exchanger2 BTC balance before: ' + UpdateValues.fromBTC.balance);  
    UpdateValues.fromBTC.balance -= coinsChange;
    console.log('#### exchanger2 BTC balance after: ' + UpdateValues.fromBTC.balance);  
    console.log(UpdateValues.tokenValue + ' SDT Tokens exchanged to ' + coinsChange + ' BTC with actual rate of ' + UpdateValues.tokenRate);
	  
    return getAssetRegistry('org.acme.biznet.BTCWallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toBTC,UpdateValues.fromBTC]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.SDTWallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toSDT,UpdateValues.fromSDT]);
            });            
        });  
    }
}

/**
 * BTC to cash transaction
 * @param {org.acme.biznet.TradeBTCToCash} UpdateValues
 * @transaction
 */
function TradeBTCToCash(UpdateValues) {
	
    //determine change in cash value from the rate
    var cashChange = (UpdateValues.BTCRate * UpdateValues.BTCValue);
    
    if(UpdateValues.fromBTC.balance < UpdateValues.BTCValue) {
        throw new Error('Not enough BTC for this transaction!');
    } else if(cashChange > UpdateValues.fromCash.balance) {
        throw new Error('Insufficient cash funds!');
    } else {
    //update values of exchanger1 BTC wallet
    console.log('#### exchanger1 BTC balance before: ' + UpdateValues.fromBTC.balance);
    UpdateValues.fromBTC.balance -= UpdateValues.BTCValue;
    console.log('#### exchanger1 BTC balance after: ' + UpdateValues.fromBTC.balance);
    //update values of exchanger2 BTC wallet
    console.log('#### exchanger2 BTC balance before: ' + UpdateValues.toBTC.balance);
    UpdateValues.toBTC.balance += UpdateValues.BTCValue;
    console.log('#### exchanger2 BTC balance after: ' + UpdateValues.toBTC.balance);
    //update values of exchanger1 cash account
    console.log('#### exchanger1 cash balance before: ' + UpdateValues.toCash.balance);
    UpdateValues.toCash.balance += cashChange;
    console.log('#### exchanger1 cash balance after: ' + UpdateValues.toCash.balance);
    //update values of echanger2 cash account
    console.log('#### exchanger2 cash balance before: ' + UpdateValues.fromCash.balance);  
    UpdateValues.fromCash.balance -= cashChange;
    console.log('#### exchanger2 cash balance after: ' + UpdateValues.fromCash.balance);  
    console.log(UpdateValues.BTCValue + ' BTC exchanged to ' + cashChange + ' EUR with actual rate of ' + UpdateValues.BTCRate);
  
    return getAssetRegistry('org.acme.biznet.Account')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toCash,UpdateValues.fromCash]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.BTCWallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toBTC,UpdateValues.fromBTC]);
            });            
        });  
    }
}

/**
 * BTC to tokens transaction
 * @param {org.acme.biznet.TradeBTCToTokens} UpdateValues
 * @transaction
 */
function TradeBTCToTokens(UpdateValues) {
	
    //determine change in tokens value from the rate
    var tokensChange = (UpdateValues.BTCRate * UpdateValues.BTCValue);

    if(UpdateValues.fromBTC.balance < UpdateValues.BTCValue) {
    	throw new Error('Insufficient BTC funds!');
    } else if (tokensChange > UpdateValues.fromSDT.balance) {
        throw new Error('Not enough SDT tokens for this transaction!'); 
    } else {
    //update values of exchanger1 BTC wallet
    console.log('#### exchanger1 BTC balance before: ' + UpdateValues.fromBTC.balance);
    UpdateValues.fromBTC.balance -= UpdateValues.BTCValue;
    console.log('#### exchanger1 BTC balance after: ' + UpdateValues.fromBTC.balance);
    //update values of exchanger2 BTC wallet
    console.log('#### exchanger2 BTC balance before: ' + UpdateValues.toBTC.balance);
    UpdateValues.toBTC.balance += UpdateValues.BTCValue;
    console.log('#### exchanger2 BTC balance after: ' + UpdateValues.toBTC.balance);
    //update values of exchanger1 SDT token wallet
    console.log('#### exchanger1 SDT token balance before: ' + UpdateValues.toSDT.balance);
    UpdateValues.toSDT.balance += tokensChange;
    console.log('#### exchanger1 SDT token balance after: ' + UpdateValues.toSDT.balance);
    //update values of exchanger2 SDT token wallet
    console.log('#### exchanger2 SDT token balance before: ' + UpdateValues.fromSDT.balance);
    UpdateValues.fromSDT.balance -= tokensChange;
    console.log('#### exchanger2 SDT token balance after: ' + UpdateValues.fromSDT.balance);
    console.log(UpdateValues.BTCValue + ' BTC exchanged to ' + tokensChange + ' SDT Tokens with actual rate of ' + UpdateValues.BTCRate);

    return getAssetRegistry('org.acme.biznet.SDTWallet')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.toSDT,UpdateValues.fromSDT]);
        })                
        .then(function () {
            return  getAssetRegistry('org.acme.biznet.BTCWallet')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.toBTC,UpdateValues.fromBTC]); 
            });            
        });  
    }
}