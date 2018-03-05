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
 * @param {org.acme.biznet.TradeWeatherDataToTokens} WeatherDataReceived
 * @transaction
 */
function TradeWeatherDataToTokens(WeatherDataReceived) {
  
   	var weatherdata = WeatherDataReceived.weatherdata;
  	weatherdata.status = 'FOR_SALE';
  var position = WeatherDataReceived.weatherdata.location;
	console.log('Weather data received at: ' + WeatherDataReceived.timestamp + ' from ' + weatherdata.position); 
  
    WeatherDataReceived.weatherdata.owner = WeatherDataReceived.newOwner;
  	weatherdata.status = 'SOLD';
  
   //update values of the wallets
  	WeatherDataReceived.fromWallet.balance = WeatherDataReceived.fromWallet.balance - WeatherDataReceived.amount;
  	WeatherDataReceived.toWallet.balance = WeatherDataReceived.toWallet.balance + WeatherDataReceived.amount;
    
    return getAssetRegistry('org.acme.biznet.WeatherData')
        .then(function(assetRegistry) {
            return assetRegistry.update(WeatherDataReceived.weatherdata);
        })
  .then(function(){
  return getAssetRegistry('org.acme.biznet.Wallet');
    })
  	.then(function (assetRegistry) {
    	return assetRegistry.update(WeatherDataReceived.fromWallet);
  })
  .then(function(){
    return getAssetRegistry('org.acme.biznet.Wallet');
  })
  .then(function(assetRegistry) { 
    return assetRegistry.update(WeatherDataReceived.toWallet);
      
      var tradeWeatherDataNotification = getFactory().newEvent('org.acme.biznet', 'TradeWeatherDataNotification');
      	tradeWeatherDataNotification.weatherdata = WeatherDataReceived.weatherdata;
			emit(tradeWeatherDataNotification);
      	
      console.log('Wetterdaten mit ID' + weatherDataId + ' wurde verkauft');
  });
        
}

/**
 * Sensor data to tokens trading transaction
 * @param {org.acme.biznet.TradeAirPollutionDataToTokens} AirPollutionDataReceived
 * @transaction
 */
function TradeAirPollutionDataToTokens(AirPollutionDataReceived) {
  	
  	
   	var airpollutiondata = AirPollutionDataReceived.airpollutiondata;
  	//var position = AirPollutionDataReceived.airpollutiondata.location;
  	airpollutiondata.status = 'FOR_SALE';
	//console.log('Air pollution data received at: ' + AirPollutionDataReceived.timestamp + 'from ' + position); 
  
    AirPollutionDataReceived.weatherdata.owner = AirPollutionDataReceived.newOwner;
  	airpollutiondata.status = 'SOLD';
  
   //update values of the wallets
  	AirPollutionDataReceived.fromWallet.balance = AirPollutionDataReceived.fromWallet.balance - AirPollutionDataReceived.amount;
  	AirPollutionDataReceived.toWallet.balance = AirPollutionDataReceived.toWallet.balance + AirPollutionDataReceived.amount;
    
    return getAssetRegistry('org.acme.biznet.WeatherData')
        .then(function(assetRegistry) {
            return assetRegistry.update(AirPollutionDataReceived.weatherdata);
        })
  .then(function(){
  return getAssetRegistry('org.acme.biznet.Wallet');
    })
  	.then(function (assetRegistry) {
    	return assetRegistry.update(AirPollutionDataReceived.fromWallet);
  })
  .then(function(){
    return getAssetRegistry('org.acme.biznet.Wallet');
  })
  .then(function(assetRegistry) { 
    return assetRegistry.update(AirPollutionDataReceived.toWallet);
      
      var tradeWeatherDataNotification = getFactory().newEvent('org.acme.biznet', 'TradeWeatherDataNotification');
      	tradeWeatherDataNotification.weatherdata = AirPollutionDataReceived.weatherdata;
			emit(tradeWeatherDataNotification);
      	
      console.log('Luftverschmutzungsdaten mit ID' + airPollutionDataId + ' wurde verkauft');
  });
        
}

/**
 * Weather forecast data to cash trading transaction
 * @param {org.acme.biznet.ForwardWeatherForecast} ForecastForwarded
 * @transaction
 */
function ForwardWeatherForecast(ForecastForwarded) {
  var weatherforecast = ForecastForwarded.weatherforecast;
  weatherforecast.status = 'PROCESSED';
  
    ForecastForwarded.weatherforecast.owner = ForecastForwarded.newOwner;
  	weatherforecast.status = 'FORWARED';
   //update values of the accounts
  	ForecastForwarded.fromAccount.balance = ForecastForwarded.fromAccount.balance - ForecastForwarded.amount;
  	ForecastForwarded.toAccount.balance = ForecastForwarded.toAccount.balance + ForecastForwarded.amount;
    
    return getAssetRegistry('org.acme.biznet.WeatherForecast')
        .then(function(assetRegistry) {
            return assetRegistry.update(ForecastForwarded.weatherforecast);
        })
  		.then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            	.then(function (assetRegistry) {
                	return assetRegistry.updateAll([ForecastForwarded.toAccount,ForecastForwarded.fromAccount]);
            	});  
    	});
}

/**
 * Air quality data to cash trading transaction
 * @param {org.acme.biznet.ForwardAirQualityData} QualityDataForwarded
 * @transaction
 */
function ForwardAirQualityData(QualityDataForwarded) {
    QualityDataForwarded.airqualitydata.owner = QualityDataForwarded.newOwner;
  	
   //update values of the accounts
  	QualityDataForwarded.fromAccount.balance = QualityDataForwarded.fromAccount.balance - QualityDataForwarded.amount;
  	QualityDataForwarded.toAccount.balance = QualityDataForwarded.toAccount.balance + QualityDataForwarded.amount;
    
    return getAssetRegistry('org.acme.biznet.AirQualityData')
        .then(function(assetRegistry) {
            return assetRegistry.update(QualityDataForwarded.airqualitydata);
        })
  		.then(function () {
            return  getAssetRegistry('org.acme.biznet.Account')
            	.then(function (assetRegistry) {
                	return assetRegistry.updateAll([QualityDataForwarded.toAccount,QualityDataForwarded.fromAccount]);
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
    UpdateValues.toWallet.balance = UpdateValues.toWallet.balance + tokensChange;
    UpdateValues.fromWallet.balance = UpdateValues.fromWallet.balance - tokensChange;
    UpdateValues.toAccount.balance = UpdateValues.toAccount.balance + UpdateValues.cashValue;
    UpdateValues.fromAccount.balance = UpdateValues.fromAccount.balance - UpdateValues.cashValue;

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
  	UpdateValues.toAccount.balance = UpdateValues.toAccount.balance + cashChange;
  	UpdateValues.fromAccount.balance = UpdateValues.fromAccount.balance - cashChange;
  	UpdateValues.toWallet.balance = UpdateValues.toWallet.balance + UpdateValues.coinValue;
  	UpdateValues.fromWallet.balance = UpdateValues.fromWallet.balance - UpdateValues.coinValue;
   
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




