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
import { EnrichedDataService } from './EnrichedData.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-EnrichedData',
	templateUrl: './EnrichedData.component.html',
	styleUrls: ['./EnrichedData.component.css'],
  providers: [EnrichedDataService]
})
export class EnrichedDataComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          EnrichedDataId = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          country = new FormControl("", Validators.required);
        
  
      
          createdTime = new FormControl("", Validators.required);
        
  
      
          PM25_Concentration = new FormControl("", Validators.required);
        
  
      
          AQIndex = new FormControl("", Validators.required);
        
  
      
          APLevel = new FormControl("", Validators.required);
        
  
      
          healthImplications = new FormControl("", Validators.required);
        
  
      
          cautionaryStatement = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          fromRawData = new FormControl("", Validators.required);
        
  


  constructor(private serviceEnrichedData:EnrichedDataService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          EnrichedDataId:this.EnrichedDataId,
        
    
        
          location:this.location,
        
    
        
          country:this.country,
        
    
        
          createdTime:this.createdTime,
        
    
        
          PM25_Concentration:this.PM25_Concentration,
        
    
        
          AQIndex:this.AQIndex,
        
    
        
          APLevel:this.APLevel,
        
    
        
          healthImplications:this.healthImplications,
        
    
        
          cautionaryStatement:this.cautionaryStatement,
        
    
        
          status:this.status,
        
    
        
          owner:this.owner,
        
    
        
          fromRawData:this.fromRawData
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceEnrichedData.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.biznet.EnrichedData",
      
        
          "EnrichedDataId":this.EnrichedDataId.value,
        
      
        
          "location":this.location.value,
        
      
        
          "country":this.country.value,
        
      
        
          "createdTime":this.createdTime.value,
        
      
        
          "PM25_Concentration":this.PM25_Concentration.value,
        
      
        
          "AQIndex":this.AQIndex.value,
        
      
        
          "APLevel":this.APLevel.value,
        
      
        
          "healthImplications":this.healthImplications.value,
        
      
        
          "cautionaryStatement":this.cautionaryStatement.value,
        
      
        
          "status":this.status.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "fromRawData":this.fromRawData.value
        
      
    };

    this.myForm.setValue({
      
        
          "EnrichedDataId":null,
        
      
        
          "location":null,
        
      
        
          "country":null,
        
      
        
          "createdTime":null,
        
      
        
          "PM25_Concentration":null,
        
      
        
          "AQIndex":null,
        
      
        
          "APLevel":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "owner":null,
        
      
        
          "fromRawData":null
        
      
    });

    return this.serviceEnrichedData.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "EnrichedDataId":null,
        
      
        
          "location":null,
        
      
        
          "country":null,
        
      
        
          "createdTime":null,
        
      
        
          "PM25_Concentration":null,
        
      
        
          "AQIndex":null,
        
      
        
          "APLevel":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "owner":null,
        
      
        
          "fromRawData":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.biznet.EnrichedData",
      
        
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "country":this.country.value,
          
        
    
        
          
            "createdTime":this.createdTime.value,
          
        
    
        
          
            "PM25_Concentration":this.PM25_Concentration.value,
          
        
    
        
          
            "AQIndex":this.AQIndex.value,
          
        
    
        
          
            "APLevel":this.APLevel.value,
          
        
    
        
          
            "healthImplications":this.healthImplications.value,
          
        
    
        
          
            "cautionaryStatement":this.cautionaryStatement.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "fromRawData":this.fromRawData.value
          
        
    
    };

    return this.serviceEnrichedData.updateAsset(form.get("EnrichedDataId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceEnrichedData.deleteAsset(this.currentId)
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

    return this.serviceEnrichedData.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "EnrichedDataId":null,
          
        
          
            "location":null,
          
        
          
            "country":null,
          
        
          
            "createdTime":null,
          
        
          
            "PM25_Concentration":null,
          
        
          
            "AQIndex":null,
          
        
          
            "APLevel":null,
          
        
          
            "healthImplications":null,
          
        
          
            "cautionaryStatement":null,
          
        
          
            "status":null,
          
        
          
            "owner":null,
          
        
          
            "fromRawData":null 
          
        
      };



      
        if(result.EnrichedDataId){
          
            formObject.EnrichedDataId = result.EnrichedDataId;
          
        }else{
          formObject.EnrichedDataId = null;
        }
      
        if(result.location){
          
            formObject.location = result.location;
          
        }else{
          formObject.location = null;
        }
      
        if(result.country){
          
            formObject.country = result.country;
          
        }else{
          formObject.country = null;
        }
      
        if(result.createdTime){
          
            formObject.createdTime = result.createdTime;
          
        }else{
          formObject.createdTime = null;
        }
      
        if(result.PM25_Concentration){
          
            formObject.PM25_Concentration = result.PM25_Concentration;
          
        }else{
          formObject.PM25_Concentration = null;
        }
      
        if(result.AQIndex){
          
            formObject.AQIndex = result.AQIndex;
          
        }else{
          formObject.AQIndex = null;
        }
      
        if(result.APLevel){
          
            formObject.APLevel = result.APLevel;
          
        }else{
          formObject.APLevel = null;
        }
      
        if(result.healthImplications){
          
            formObject.healthImplications = result.healthImplications;
          
        }else{
          formObject.healthImplications = null;
        }
      
        if(result.cautionaryStatement){
          
            formObject.cautionaryStatement = result.cautionaryStatement;
          
        }else{
          formObject.cautionaryStatement = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.fromRawData){
          
            formObject.fromRawData = result.fromRawData;
          
        }else{
          formObject.fromRawData = null;
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
      
        
          "EnrichedDataId":null,
        
      
        
          "location":null,
        
      
        
          "country":null,
        
      
        
          "createdTime":null,
        
      
        
          "PM25_Concentration":null,
        
      
        
          "AQIndex":null,
        
      
        
          "APLevel":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "owner":null,
        
      
        
          "fromRawData":null 
        
      
      });
  }

}
