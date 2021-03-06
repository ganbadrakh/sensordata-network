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
import { RequesterService } from './Requester.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Requester',
	templateUrl: './Requester.component.html',
	styleUrls: ['./Requester.component.css'],
  providers: [RequesterService]
})
export class RequesterComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          requesterId = new FormControl("", Validators.required);
        
  
      
          sdtWallet = new FormControl("", Validators.required);
        
  
      
          account = new FormControl("", Validators.required);
        
  
      
          memberId = new FormControl("", Validators.required);
        
  
      
          name = new FormControl("", Validators.required);
        
  
      
          email = new FormControl("", Validators.required);
        
  


  constructor(private serviceRequester:RequesterService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          requesterId:this.requesterId,
        
    
        
          sdtWallet:this.sdtWallet,
        
    
        
          account:this.account,
        
    
        
          memberId:this.memberId,
        
    
        
          name:this.name,
        
    
        
          email:this.email
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceRequester.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.acme.biznet.Requester",
      
        
          "requesterId":this.requesterId.value,
        
      
        
          "sdtWallet":this.sdtWallet.value,
        
      
        
          "account":this.account.value,
        
      
        
          "memberId":this.memberId.value,
        
      
        
          "name":this.name.value,
        
      
        
          "email":this.email.value
        
      
    };

    this.myForm.setValue({
      
        
          "requesterId":null,
        
      
        
          "sdtWallet":null,
        
      
        
          "account":null,
        
      
        
          "memberId":null,
        
      
        
          "name":null,
        
      
        
          "email":null
        
      
    });

    return this.serviceRequester.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "requesterId":null,
        
      
        
          "sdtWallet":null,
        
      
        
          "account":null,
        
      
        
          "memberId":null,
        
      
        
          "name":null,
        
      
        
          "email":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.acme.biznet.Requester",
      
        
          
        
    
        
          
            "sdtWallet":this.sdtWallet.value,
          
        
    
        
          
            "account":this.account.value,
          
        
    
        
          
            "memberId":this.memberId.value,
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "email":this.email.value
          
        
    
    };

    return this.serviceRequester.updateParticipant(form.get("requesterId").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceRequester.deleteParticipant(this.currentId)
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

    return this.serviceRequester.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "requesterId":null,
          
        
          
            "sdtWallet":null,
          
        
          
            "account":null,
          
        
          
            "memberId":null,
          
        
          
            "name":null,
          
        
          
            "email":null 
          
        
      };



      
        if(result.requesterId){
          
            formObject.requesterId = result.requesterId;
          
        }else{
          formObject.requesterId = null;
        }
      
        if(result.sdtWallet){
          
            formObject.sdtWallet = result.sdtWallet;
          
        }else{
          formObject.sdtWallet = null;
        }
      
        if(result.account){
          
            formObject.account = result.account;
          
        }else{
          formObject.account = null;
        }
      
        if(result.memberId){
          
            formObject.memberId = result.memberId;
          
        }else{
          formObject.memberId = null;
        }
      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
        }
      
        if(result.email){
          
            formObject.email = result.email;
          
        }else{
          formObject.email = null;
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
      
        
          "requesterId":null,
        
      
        
          "sdtWallet":null,
        
      
        
          "account":null,
        
      
        
          "memberId":null,
        
      
        
          "name":null,
        
      
        
          "email":null 
        
      
      });
  }

}
