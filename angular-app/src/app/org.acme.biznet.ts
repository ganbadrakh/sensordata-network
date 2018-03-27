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
   export enum OwnerEntity {
      Seller,
      Buyer,
      Exchange,
      DataConsumer,
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
      token: string;
      balance: number;
   }
   export class Account extends Asset {
      accountId: string;
      ownerId: string;
      currency: string;
      balance: number;
   }
   export class AirPollutionData extends Asset {
      airPollutionDataId: string;
      location: string;
      datetime: Date;
      PM25: number[];
      PM10: number;
      CO: number;
      NO2: number;
      O3: number;
      SO2: number;
      status: TransferStatus;
      ownerEntity: OwnerEntity;
      owner: Member;
   }
   export class ExtendedData extends Asset {
      extendedDataId: string;
      dataFrom: string;
      location: string;
      datetime: Date;
      PM25_Concentration: string;
      AQIndex: string;
      level: APLevel;
      healthImplications: string;
      cautionaryStatement: string;
      status: TransferStatus;
      ownerEntity: OwnerEntity;
      owner: Member;
   }
   export class TradeAirPollutionData extends Transaction {
      amount: number;
      airpollutiondata: AirPollutionData;
      owner: Seller;
      newOwner: Buyer;
      fromWallet: Wallet;
      toWallet: Wallet;
   }
   export class ProvideExtendedData extends Transaction {
      amount: number;
      extendeddata: ExtendedData;
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
   export class TradeAirPollutionDataNotification extends Event {
      airpollutiondata: AirPollutionData;
   }
   export class ProvideExtendedDataNotification extends Event {
      extendeddata: ExtendedData;
   }
// }
