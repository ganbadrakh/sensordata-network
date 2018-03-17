import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AirQualityDataService } from './AirQualityData.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-AirQualityData',
	templateUrl: './AirQualityData.component.html',
	styleUrls: ['./AirQualityData.component.css'],
  providers: [AirQualityDataService]
})
export class AirQualityDataComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          airQualityDataId = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          AQIndex = new FormControl("", Validators.required);
        
  
      
          level = new FormControl("", Validators.required);
        
  
      
          healthImplications = new FormControl("", Validators.required);
        
  
      
          cautionaryStatement = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceAirQualityData:AirQualityDataService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          airQualityDataId:this.airQualityDataId,
        
    
        
          location:this.location,
        
    
        
          datetime:this.datetime,
        
    
        
          AQIndex:this.AQIndex,
        
    
        
          level:this.level,
        
    
        
          healthImplications:this.healthImplications,
        
    
        
          cautionaryStatement:this.cautionaryStatement,
        
    
        
          status:this.status,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAirQualityData.getAll()
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
      $class: "org.acme.biznet.AirQualityData",
      
        
          "airQualityDataId":this.airQualityDataId.value,
        
      
        
          "location":this.location.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "AQIndex":this.AQIndex.value,
        
      
        
          "level":this.level.value,
        
      
        
          "healthImplications":this.healthImplications.value,
        
      
        
          "cautionaryStatement":this.cautionaryStatement.value,
        
      
        
          "status":this.status.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "airQualityDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "AQIndex":null,
        
      
        
          "level":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceAirQualityData.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "airQualityDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "AQIndex":null,
        
      
        
          "level":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "owner":null 
        
      
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
      $class: "org.acme.biznet.AirQualityData",
      
        
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "AQIndex":this.AQIndex.value,
          
        
    
        
          
            "level":this.level.value,
          
        
    
        
          
            "healthImplications":this.healthImplications.value,
          
        
    
        
          
            "cautionaryStatement":this.cautionaryStatement.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceAirQualityData.updateAsset(form.get("airQualityDataId").value,this.asset)
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

    return this.serviceAirQualityData.deleteAsset(this.currentId)
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

    return this.serviceAirQualityData.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "airQualityDataId":null,
          
        
          
            "location":null,
          
        
          
            "datetime":null,
          
        
          
            "AQIndex":null,
          
        
          
            "level":null,
          
        
          
            "healthImplications":null,
          
        
          
            "cautionaryStatement":null,
          
        
          
            "status":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.airQualityDataId){
          
            formObject.airQualityDataId = result.airQualityDataId;
          
        }else{
          formObject.airQualityDataId = null;
        }
      
        if(result.location){
          
            formObject.location = result.location;
          
        }else{
          formObject.location = null;
        }
      
        if(result.datetime){
          
            formObject.datetime = result.datetime;
          
        }else{
          formObject.datetime = null;
        }
      
        if(result.AQIndex){
          
            formObject.AQIndex = result.AQIndex;
          
        }else{
          formObject.AQIndex = null;
        }
      
        if(result.level){
          
            formObject.level = result.level;
          
        }else{
          formObject.level = null;
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
      
        
          "airQualityDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "AQIndex":null,
        
      
        
          "level":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
