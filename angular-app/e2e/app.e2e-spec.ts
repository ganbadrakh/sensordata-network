import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

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

  it('navbar-brand should be sensordata-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('sensordata-network@0.0.1');
  });

  
    it('Wallet component should be loadable',() => {
      page.navigateTo('/Wallet');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Wallet');
    });

    it('Wallet table should have 4 columns',() => {
      page.navigateTo('/Wallet');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('Account component should be loadable',() => {
      page.navigateTo('/Account');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Account');
    });

    it('Account table should have 4 columns',() => {
      page.navigateTo('/Account');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('WeatherData component should be loadable',() => {
      page.navigateTo('/WeatherData');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('WeatherData');
    });

    it('WeatherData table should have 10 columns',() => {
      page.navigateTo('/WeatherData');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });

  
    it('AirPollutionData component should be loadable',() => {
      page.navigateTo('/AirPollutionData');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('AirPollutionData');
    });

    it('AirPollutionData table should have 12 columns',() => {
      page.navigateTo('/AirPollutionData');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });

  
    it('WeatherForecast component should be loadable',() => {
      page.navigateTo('/WeatherForecast');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('WeatherForecast');
    });

    it('WeatherForecast table should have 10 columns',() => {
      page.navigateTo('/WeatherForecast');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });

  
    it('AirQualityData component should be loadable',() => {
      page.navigateTo('/AirQualityData');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('AirQualityData');
    });

    it('AirQualityData table should have 11 columns',() => {
      page.navigateTo('/AirQualityData');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });

  

});
