import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.biznet{
   export abstract class Member extends Participant {
      memberId: string;
      name: string;
      email: string;
   }
   export class Provider extends Member {
      providerId: string;
      sdtWallet: SDTWallet;
      btcWallet: BTCWallet;
      account: Account;
   }
   export class Requester extends Member {
      requesterId: string;
      sdtWallet: SDTWallet;
      account: Account;
   }
   export class Consumer extends Member {
      consumerId: string;
      account: Account;
   }
   export class Exchange extends Member {
      exchangeId: string;
      sdtWallet: SDTWallet;
      btcWallet: BTCWallet;
      account: Account;
   }
   export class SDTWallet extends Asset {
      sdtWalletId: string;
      balance: number;
      owner: Member;
   }
   export class BTCWallet extends Asset {
      btcWalletId: string;
      balance: number;
      owner: Member;
   }
   export class Account extends Asset {
      accountId: string;
      balance: number;
      owner: Member;
   }
   export class Sensor extends Asset {
      sensorId: string;
      position: Address;
      sensorType: string;
      sensorName: string;
      manufacturer: string;
      firmware: string;
      owner: Provider;
   }
   export enum TransferStatus {
      FOR_SALE,
      SOLD,
      PROCESSED,
      FORWARDED,
   }
   export class Address {
      country: string;
      city: string;
      street: string;
      postalCode: number;
   }
   export class RawData extends Asset {
      RawDataId: string;
      position: Address;
      createdTime: Date;
      PM25: number[];
      PM10: number;
      CO: number;
      NO2: number;
      O3: number;
      SO2: number;
      status: TransferStatus;
      owner: Member;
      fromSensor: Sensor;
   }
   export enum AirPollutionLevel {
      GOOD,
      MODERATE,
      UNHEALTHY_FOR_SENSITIVE_GROUPS,
      UNHEALTHY,
      VERY_UNHEALTHY,
      HAZARDOUS,
   }
   export class Location {
      latitude: number;
      longitude: number;
   }
   export class EnrichedData extends Asset {
      EnrichedDataId: string;
      location: Location;
      country: string;
      createdTime: Date;
      PM25_Concentration: number;
      AQIndex: string;
      APLevel: AirPollutionLevel;
      healthImplications: string;
      cautionaryStatement: string;
      status: TransferStatus;
      owner: Member;
      fromRawData: RawData;
   }
   export class TransferRawData extends Transaction {
      price: number;
      rawdata: RawData;
      newOwner: Requester;
      fromSDT: SDTWallet;
      toSDT: SDTWallet;
   }
   export class TransferEnrichedData extends Transaction {
      price: number;
      enricheddata: EnrichedData;
      newOwner: Consumer;
      fromCash: Account;
      toCash: Account;
   }
   export class TradeCashToTokens extends Transaction {
      cashRate: number;
      cashValue: number;
      fromCash: Account;
      toCash: Account;
      fromSDT: SDTWallet;
      toSDT: SDTWallet;
   }
   export class TradeCashToBTC extends Transaction {
      cashRate: number;
      cashValue: number;
      fromCash: Account;
      toCash: Account;
      fromBTC: BTCWallet;
      toBTC: BTCWallet;
   }
   export class TradeTokensToCash extends Transaction {
      tokenRate: number;
      tokenValue: number;
      fromSDT: SDTWallet;
      toSDT: SDTWallet;
      fromCash: Account;
      toCash: Account;
   }
   export class TradeTokensToBTC extends Transaction {
      tokenRate: number;
      tokenValue: number;
      fromSDT: SDTWallet;
      toSDT: SDTWallet;
      fromBTC: BTCWallet;
      toBTC: BTCWallet;
   }
   export class TradeBTCToTokens extends Transaction {
      BTCRate: number;
      BTCValue: number;
      fromBTC: BTCWallet;
      toBTC: BTCWallet;
      fromSDT: SDTWallet;
      toSDT: SDTWallet;
   }
   export class TradeBTCToCash extends Transaction {
      BTCRate: number;
      BTCValue: number;
      fromBTC: BTCWallet;
      toBTC: BTCWallet;
      fromCash: Account;
      toCash: Account;
   }
   export class TransferRawDataNotification extends Event {
      rawdata: RawData;
   }
   export class TransferEnrichedDataNotification extends Event {
      enricheddata: EnrichedData;
   }
// }
