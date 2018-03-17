import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Member} from './composer.base';
// export namespace org.acme.biznet{
   export enum TransferStatus {
      FOR_SALE,
      SOLD,
      PROCESSED,
      FORWARDED,
   }
   export enum APLevel {
      GOOD,
      MODERATE,
      UNHEALTHY_FOR_SENSITIVE_GROUPS,
      UNHEALTHY,
      VERY_UNHEALTHY,
      HAZARDOUS,
   }
   export enum TempUnit {
      CELSIUS,
      FAHRENHEIT,
   }
   export enum CurrentCondition {
      SUNNY,
      CLOUDY,
      MOSTLY_CLOUDY,
      PARTLY_CLOUDY,
      RAINY,
      SNOWY,
      WINDY,
      THUNDER,
      BLIZZARD,
      STORM,
   }
   export enum ConditionTomorrow {
      SUNNY,
      CLOUDY,
      MOSTLY_CLOUDY,
      PARTLY_CLOUDY,
      RAINY,
      SNOWY,
      WINDY,
      THUNDER,
      BLIZZARD,
      STORM,
   }
   export class Seller extends Member {
      sellerId: string;
      firstName: string;
      lastName: string;
      wallet: Wallet;
      account: Account;
   }
   export class Buyer extends Member {
      buyerId: string;
      name: string;
      wallet: Wallet;
      account: Account;
   }
   export class Exchange extends Member {
      exchangeId: string;
      name: string;
      wallet: Wallet;
      account: Account;
   }
   export class DataConsumer extends Member {
      dataConsumerId: string;
      name: string;
      account: Account;
   }
   export class Wallet extends Asset {
      walletId: string;
      ownerId: string;
      balance: number;
   }
   export class Account extends Asset {
      accountId: string;
      ownerId: string;
      balance: number;
   }
   export class WeatherData extends Asset {
      weatherDataId: string;
      location: string;
      datetime: Date;
      currentCondition: CurrentCondition;
      tempUnit: TempUnit;
      currentTemp: number;
      currentHumidity: number;
      status: TransferStatus;
      owner: Member;
   }
   export class AirPollutionData extends Asset {
      airPollutionDataId: string;
      location: string;
      datetime: Date;
      PM25: number[];
      PM10: number[];
      CO: number;
      NO2: number;
      O3: number;
      SO2: number;
      status: TransferStatus;
      owner: Member;
   }
   export class WeatherForecast extends Asset {
      weatherForecastId: string;
      location: string;
      datetime: Date;
      tempUnit: TempUnit;
      tempTomorrow: number;
      humidityTomorrow: number;
      conditionTomorrow: ConditionTomorrow;
      status: TransferStatus;
      owner: Member;
   }
   export class AirQualityData extends Asset {
      airQualityDataId: string;
      dataFrom: string;
      location: string;
      datetime: Date;
      AQIndex: string;
      level: APLevel;
      healthImplications: string;
      cautionaryStatement: string;
      status: TransferStatus;
      owner: Member;
   }
   export class TradeWeatherDataToTokens extends Transaction {
      amount: number;
      weatherdata: WeatherData;
      owner: Seller;
      newOwner: Buyer;
      fromWallet: Wallet;
      toWallet: Wallet;
   }
   export class TradeAirPollutionDataToTokens extends Transaction {
      amount: number;
      airpollutiondata: AirPollutionData;
      owner: Seller;
      newOwner: Buyer;
      fromWallet: Wallet;
      toWallet: Wallet;
   }
   export class ForwardWeatherForecast extends Transaction {
      amount: number;
      weatherforecast: WeatherForecast;
      owner: Buyer;
      newOwner: DataConsumer;
      fromAccount: Account;
      toAccount: Account;
   }
   export class ForwardAirQualityData extends Transaction {
      amount: number;
      airqualitydata: AirQualityData;
      owner: Buyer;
      newOwner: DataConsumer;
      fromAccount: Account;
      toAccount: Account;
   }
   export class ExchangeCashToTokens extends Transaction {
      cashRate: number;
      cashValue: number;
      fromWallet: Wallet;
      toWallet: Wallet;
      fromAccount: Account;
      toAccount: Account;
   }
   export class ExchangeTokensToCash extends Transaction {
      tokenRate: number;
      tokenValue: number;
      fromWallet: Wallet;
      toWallet: Wallet;
      fromAccount: Account;
      toAccount: Account;
   }
   export class TradeWeatherDataNotification extends Event {
      weatherdata: WeatherData;
   }
   export class TradeAirPollutionDataNotification extends Event {
      airpollutiondata: AirPollutionData;
   }
   export class ForwardWeatherForecastNotification extends Event {
      weatherforecast: WeatherForecast;
   }
   export class ForwardAirQualityDataNotification extends Event {
      airqualitydata: AirQualityData;
   }
// }
