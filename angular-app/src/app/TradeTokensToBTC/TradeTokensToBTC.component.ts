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
import { TradeTokensToBTCService } from './TradeTokensToBTC.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-TradeTokensToBTC',
	templateUrl: './TradeTokensToBTC.component.html',
	styleUrls: ['./TradeTokensToBTC.component.css'],
  providers: [TradeTokensToBTCService]
})
export class TradeTokensToBTCComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          tokenRate = new FormControl("", Validators.required);
        
  
      
          tokenValue = new FormControl("", Validators.required);
        
  
      
          fromSDT = new FormControl("", Validators.required);
        
  
      
          toSDT = new FormControl("", Validators.required);
        
  
      
          fromBTC = new FormControl("", Validators.required);
        
  
      
          toBTC = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceTradeTokensToBTC:TradeTokensToBTCService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          tokenRate:this.tokenRate,
        
    
        
          tokenValue:this.tokenValue,
        
    
        
          fromSDT:this.fromSDT,
        
    
        
          toSDT:this.toSDT,
        
    
        
          fromBTC:this.fromBTC,
        
    
        
          toBTC:this.toBTC,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTradeTokensToBTC.getAll()
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
      $class: "org.acme.biznet.TradeTokensToBTC",
      
        
          "tokenRate":this.tokenRate.value,
        
      
        
          "tokenValue":this.tokenValue.value,
        
      
        
          "fromSDT":this.fromSDT.value,
        
      
        
          "toSDT":this.toSDT.value,
        
      
        
          "fromBTC":this.fromBTC.value,
        
      
        
          "toBTC":this.toBTC.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "tokenRate":null,
        
      
        
          "tokenValue":null,
        
      
        
          "fromSDT":null,
        
      
        
          "toSDT":null,
        
      
        
          "fromBTC":null,
        
      
        
          "toBTC":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceTradeTokensToBTC.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "tokenRate":null,
        
      
        
          "tokenValue":null,
        
      
        
          "fromSDT":null,
        
      
        
          "toSDT":null,
        
      
        
          "fromBTC":null,
        
      
        
          "toBTC":null,
        
      
        
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
      $class: "org.acme.biznet.TradeTokensToBTC",
      
        
          
            "tokenRate":this.tokenRate.value,
          
        
    
        
          
            "tokenValue":this.tokenValue.value,
          
        
    
        
          
            "fromSDT":this.fromSDT.value,
          
        
    
        
          
            "toSDT":this.toSDT.value,
          
        
    
        
          
            "fromBTC":this.fromBTC.value,
          
        
    
        
          
            "toBTC":this.toBTC.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceTradeTokensToBTC.updateTransaction(form.get("transactionId").value,this.Transaction)
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

    return this.serviceTradeTokensToBTC.deleteTransaction(this.currentId)
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

    return this.serviceTradeTokensToBTC.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "tokenRate":null,
          
        
          
            "tokenValue":null,
          
        
          
            "fromSDT":null,
          
        
          
            "toSDT":null,
          
        
          
            "fromBTC":null,
          
        
          
            "toBTC":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.tokenRate){
          
            formObject.tokenRate = result.tokenRate;
          
        }else{
          formObject.tokenRate = null;
        }
      
        if(result.tokenValue){
          
            formObject.tokenValue = result.tokenValue;
          
        }else{
          formObject.tokenValue = null;
        }
      
        if(result.fromSDT){
          
            formObject.fromSDT = result.fromSDT;
          
        }else{
          formObject.fromSDT = null;
        }
      
        if(result.toSDT){
          
            formObject.toSDT = result.toSDT;
          
        }else{
          formObject.toSDT = null;
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
      
        
          "tokenRate":null,
        
      
        
          "tokenValue":null,
        
      
        
          "fromSDT":null,
        
      
        
          "toSDT":null,
        
      
        
          "fromBTC":null,
        
      
        
          "toBTC":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

