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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('network-name should be sensordata@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('sensordata@0.0.1.bna');
    });
  });

  it('navbar-brand should be angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app');
    });
  });

  
    it('SDTWallet component should be loadable',() => {
      page.navigateTo('/SDTWallet');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SDTWallet');
      });
    });

    it('SDTWallet table should have 4 columns',() => {
      page.navigateTo('/SDTWallet');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('BTCWallet component should be loadable',() => {
      page.navigateTo('/BTCWallet');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BTCWallet');
      });
    });

    it('BTCWallet table should have 4 columns',() => {
      page.navigateTo('/BTCWallet');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Account component should be loadable',() => {
      page.navigateTo('/Account');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Account');
      });
    });

    it('Account table should have 4 columns',() => {
      page.navigateTo('/Account');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Sensor component should be loadable',() => {
      page.navigateTo('/Sensor');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Sensor');
      });
    });

    it('Sensor table should have 8 columns',() => {
      page.navigateTo('/Sensor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('RawData component should be loadable',() => {
      page.navigateTo('/RawData');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RawData');
      });
    });

    it('RawData table should have 13 columns',() => {
      page.navigateTo('/RawData');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(13); // Addition of 1 for 'Action' column
      });
    });
  
    it('EnrichedData component should be loadable',() => {
      page.navigateTo('/EnrichedData');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EnrichedData');
      });
    });

    it('EnrichedData table should have 13 columns',() => {
      page.navigateTo('/EnrichedData');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(13); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Provider component should be loadable',() => {
      page.navigateTo('/Provider');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Provider');
      });
    });

    it('Provider table should have 8 columns',() => {
      page.navigateTo('/Provider');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Requester component should be loadable',() => {
      page.navigateTo('/Requester');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Requester');
      });
    });

    it('Requester table should have 7 columns',() => {
      page.navigateTo('/Requester');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Consumer component should be loadable',() => {
      page.navigateTo('/Consumer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Consumer');
      });
    });

    it('Consumer table should have 6 columns',() => {
      page.navigateTo('/Consumer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Exchange component should be loadable',() => {
      page.navigateTo('/Exchange');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Exchange');
      });
    });

    it('Exchange table should have 8 columns',() => {
      page.navigateTo('/Exchange');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('TransferRawData component should be loadable',() => {
      page.navigateTo('/TransferRawData');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TransferRawData');
      });
    });
  
    it('TransferEnrichedData component should be loadable',() => {
      page.navigateTo('/TransferEnrichedData');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TransferEnrichedData');
      });
    });
  
    it('TradeCashToTokens component should be loadable',() => {
      page.navigateTo('/TradeCashToTokens');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TradeCashToTokens');
      });
    });
  
    it('TradeCashToBTC component should be loadable',() => {
      page.navigateTo('/TradeCashToBTC');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TradeCashToBTC');
      });
    });
  
    it('TradeTokensToCash component should be loadable',() => {
      page.navigateTo('/TradeTokensToCash');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TradeTokensToCash');
      });
    });
  
    it('TradeTokensToBTC component should be loadable',() => {
      page.navigateTo('/TradeTokensToBTC');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TradeTokensToBTC');
      });
    });
  
    it('TradeBTCToTokens component should be loadable',() => {
      page.navigateTo('/TradeBTCToTokens');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TradeBTCToTokens');
      });
    });
  
    it('TradeBTCToCash component should be loadable',() => {
      page.navigateTo('/TradeBTCToCash');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TradeBTCToCash');
      });
    });
  

});