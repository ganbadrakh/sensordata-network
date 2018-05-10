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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TradeBTCToCashService } from './TradeBTCToCash.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-TradeBTCToCash',
	templateUrl: './TradeBTCToCash.component.html',
	styleUrls: ['./TradeBTCToCash.component.css'],
  providers: [TradeBTCToCashService]
})
export class TradeBTCToCashComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          BTCRate = new FormControl("", Validators.required);
        
  
      
          BTCValue = new FormControl("", Validators.required);
        
  
      
          fromBTC = new FormControl("", Validators.required);
        
  
      
          toBTC = new FormControl("", Validators.required);
        
  
      
          fromCash = new FormControl("", Validators.required);
        
  
      
          toCash = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceTradeBTCToCash:TradeBTCToCashService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          BTCRate:this.BTCRate,
        
    
        
          BTCValue:this.BTCValue,
        
    
        
          fromBTC:this.fromBTC,
        
    
        
          toBTC:this.toBTC,
        
    
        
          fromCash:this.fromCash,
        
    
        
          toCash:this.toCash,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTradeBTCToCash.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.acme.biznet.TradeBTCToCash",
      
        
          "BTCRate":this.BTCRate.value,
        
      
        
          "BTCValue":this.BTCValue.value,
        
      
        
          "fromBTC":this.fromBTC.value,
        
      
        
          "toBTC":this.toBTC.value,
        
      
        
          "fromCash":this.fromCash.value,
        
      
        
          "toCash":this.toCash.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "BTCRate":null,
        
      
        
          "BTCValue":null,
        
      
        
          "fromBTC":null,
        
      
        
          "toBTC":null,
        
      
        
          "fromCash":null,
        
      
        
          "toCash":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceTradeBTCToCash.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "BTCRate":null,
        
      
        
          "BTCValue":null,
        
      
        
          "fromBTC":null,
        
      
        
          "toBTC":null,
        
      
        
          "fromCash":null,
        
      
        
          "toCash":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.acme.biznet.TradeBTCToCash",
      
        
          
            "BTCRate":this.BTCRate.value,
          
        
    
        
          
            "BTCValue":this.BTCValue.value,
          
        
    
        
          
            "fromBTC":this.fromBTC.value,
          
        
    
        
          
            "toBTC":this.toBTC.value,
          
        
    
        
          
            "fromCash":this.fromCash.value,
          
        
    
        
          
            "toCash":this.toCash.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceTradeBTCToCash.updateTransaction(form.get("transactionId").value,this.Transaction)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteTransaction(): Promise<any> {

    return this.serviceTradeBTCToCash.deleteTransaction(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceTradeBTCToCash.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "BTCRate":null,
          
        
          
            "BTCValue":null,
          
        
          
            "fromBTC":null,
          
        
          
            "toBTC":null,
          
        
          
            "fromCash":null,
          
        
          
            "toCash":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.BTCRate){
          
            formObject.BTCRate = result.BTCRate;
          
        }else{
          formObject.BTCRate = null;
        }
      
        if(result.BTCValue){
          
            formObject.BTCValue = result.BTCValue;
          
        }else{
          formObject.BTCValue = null;
        }
      
        if(result.fromBTC){
          
            formObject.fromBTC = result.fromBTC;
          
        }else{
          formObject.fromBTC = null;
        }
      
        if(result.toBTC){
          
            formObject.toBTC = result.toBTC;
          
        }else{
          formObject.toBTC = null;
        }
      
        if(result.fromCash){
          
            formObject.fromCash = result.fromCash;
          
        }else{
          formObject.fromCash = null;
        }
      
        if(result.toCash){
          
            formObject.toCash = result.toCash;
          
        }else{
          formObject.toCash = null;
        }
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "BTCRate":null,
        
      
        
          "BTCValue":null,
        
      
        
          "fromBTC":null,
        
      
        
          "toBTC":null,
        
      
        
          "fromCash":null,
        
      
        
          "toCash":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

