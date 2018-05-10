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
import { RawDataService } from './RawData.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-RawData',
	templateUrl: './RawData.component.html',
	styleUrls: ['./RawData.component.css'],
  providers: [RawDataService]
})
export class RawDataComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          RawDataId = new FormControl("", Validators.required);
        
  
      
          position = new FormControl("", Validators.required);
        
  
      
          createdTime = new FormControl("", Validators.required);
        
  
      
          PM25 = new FormControl("", Validators.required);
        
  
      
          PM10 = new FormControl("", Validators.required);
        
  
      
          CO = new FormControl("", Validators.required);
        
  
      
          NO2 = new FormControl("", Validators.required);
        
  
      
          O3 = new FormControl("", Validators.required);
        
  
      
          SO2 = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          fromSensor = new FormControl("", Validators.required);
        
  


  constructor(private serviceRawData:RawDataService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          RawDataId:this.RawDataId,
        
    
        
          position:this.position,
        
    
        
          createdTime:this.createdTime,
        
    
        
          PM25:this.PM25,
        
    
        
          PM10:this.PM10,
        
    
        
          CO:this.CO,
        
    
        
          NO2:this.NO2,
        
    
        
          O3:this.O3,
        
    
        
          SO2:this.SO2,
        
    
        
          status:this.status,
        
    
        
          owner:this.owner,
        
    
        
          fromSensor:this.fromSensor
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceRawData.getAll()
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
      $class: "org.acme.biznet.RawData",
      
        
          "RawDataId":this.RawDataId.value,
        
      
        
          "position":this.position.value,
        
      
        
          "createdTime":this.createdTime.value,
        
      
        
          "PM25":this.PM25.value,
        
      
        
          "PM10":this.PM10.value,
        
      
        
          "CO":this.CO.value,
        
      
        
          "NO2":this.NO2.value,
        
      
        
          "O3":this.O3.value,
        
      
        
          "SO2":this.SO2.value,
        
      
        
          "status":this.status.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "fromSensor":this.fromSensor.value
        
      
    };

    this.myForm.setValue({
      
        
          "RawDataId":null,
        
      
        
          "position":null,
        
      
        
          "createdTime":null,
        
      
        
          "PM25":null,
        
      
        
          "PM10":null,
        
      
        
          "CO":null,
        
      
        
          "NO2":null,
        
      
        
          "O3":null,
        
      
        
          "SO2":null,
        
      
        
          "status":null,
        
      
        
          "owner":null,
        
      
        
          "fromSensor":null
        
      
    });

    return this.serviceRawData.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "RawDataId":null,
        
      
        
          "position":null,
        
      
        
          "createdTime":null,
        
      
        
          "PM25":null,
        
      
        
          "PM10":null,
        
      
        
          "CO":null,
        
      
        
          "NO2":null,
        
      
        
          "O3":null,
        
      
        
          "SO2":null,
        
      
        
          "status":null,
        
      
        
          "owner":null,
        
      
        
          "fromSensor":null 
        
      
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
      $class: "org.acme.biznet.RawData",
      
        
          
        
    
        
          
            "position":this.position.value,
          
        
    
        
          
            "createdTime":this.createdTime.value,
          
        
    
        
          
            "PM25":this.PM25.value,
          
        
    
        
          
            "PM10":this.PM10.value,
          
        
    
        
          
            "CO":this.CO.value,
          
        
    
        
          
            "NO2":this.NO2.value,
          
        
    
        
          
            "O3":this.O3.value,
          
        
    
        
          
            "SO2":this.SO2.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "fromSensor":this.fromSensor.value
          
        
    
    };

    return this.serviceRawData.updateAsset(form.get("RawDataId").value,this.asset)
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

    return this.serviceRawData.deleteAsset(this.currentId)
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

    return this.serviceRawData.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "RawDataId":null,
          
        
          
            "position":null,
          
        
          
            "createdTime":null,
          
        
          
            "PM25":null,
          
        
          
            "PM10":null,
          
        
          
            "CO":null,
          
        
          
            "NO2":null,
          
        
          
            "O3":null,
          
        
          
            "SO2":null,
          
        
          
            "status":null,
          
        
          
            "owner":null,
          
        
          
            "fromSensor":null 
          
        
      };



      
        if(result.RawDataId){
          
            formObject.RawDataId = result.RawDataId;
          
        }else{
          formObject.RawDataId = null;
        }
      
        if(result.position){
          
            formObject.position = result.position;
          
        }else{
          formObject.position = null;
        }
      
        if(result.createdTime){
          
            formObject.createdTime = result.createdTime;
          
        }else{
          formObject.createdTime = null;
        }
      
        if(result.PM25){
          
            formObject.PM25 = result.PM25;
          
        }else{
          formObject.PM25 = null;
        }
      
        if(result.PM10){
          
            formObject.PM10 = result.PM10;
          
        }else{
          formObject.PM10 = null;
        }
      
        if(result.CO){
          
            formObject.CO = result.CO;
          
        }else{
          formObject.CO = null;
        }
      
        if(result.NO2){
          
            formObject.NO2 = result.NO2;
          
        }else{
          formObject.NO2 = null;
        }
      
        if(result.O3){
          
            formObject.O3 = result.O3;
          
        }else{
          formObject.O3 = null;
        }
      
        if(result.SO2){
          
            formObject.SO2 = result.SO2;
          
        }else{
          formObject.SO2 = null;
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
      
        if(result.fromSensor){
          
            formObject.fromSensor = result.fromSensor;
          
        }else{
          formObject.fromSensor = null;
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
      
        
          "RawDataId":null,
        
      
        
          "position":null,
        
      
        
          "createdTime":null,
        
      
        
          "PM25":null,
        
      
        
          "PM10":null,
        
      
        
          "CO":null,
        
      
        
          "NO2":null,
        
      
        
          "O3":null,
        
      
        
          "SO2":null,
        
      
        
          "status":null,
        
      
        
          "owner":null,
        
      
        
          "fromSensor":null 
        
      
      });
  }

}
