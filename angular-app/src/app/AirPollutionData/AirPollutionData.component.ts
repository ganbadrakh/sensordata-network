import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AirPollutionDataService } from './AirPollutionData.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-AirPollutionData',
	templateUrl: './AirPollutionData.component.html',
	styleUrls: ['./AirPollutionData.component.css'],
  providers: [AirPollutionDataService]
})
export class AirPollutionDataComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          airPollutionDataId = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          PM25 = new FormControl("", Validators.required);
        
  
      
          PM10 = new FormControl("", Validators.required);
        
  
      
          CO = new FormControl("", Validators.required);
        
  
      
          NO2 = new FormControl("", Validators.required);
        
  
      
          O3 = new FormControl("", Validators.required);
        
  
      
          SO2 = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceAirPollutionData:AirPollutionDataService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          airPollutionDataId:this.airPollutionDataId,
        
    
        
          location:this.location,
        
    
        
          datetime:this.datetime,
        
    
        
          PM25:this.PM25,
        
    
        
          PM10:this.PM10,
        
    
        
          CO:this.CO,
        
    
        
          NO2:this.NO2,
        
    
        
          O3:this.O3,
        
    
        
          SO2:this.SO2,
        
    
        
          status:this.status,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAirPollutionData.getAll()
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
      $class: "org.acme.biznet.AirPollutionData",
      
        
          "airPollutionDataId":this.airPollutionDataId.value,
        
      
        
          "location":this.location.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "PM25":this.PM25.value,
        
      
        
          "PM10":this.PM10.value,
        
      
        
          "CO":this.CO.value,
        
      
        
          "NO2":this.NO2.value,
        
      
        
          "O3":this.O3.value,
        
      
        
          "SO2":this.SO2.value,
        
      
        
          "status":this.status.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "airPollutionDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "PM25":null,
        
      
        
          "PM10":null,
        
      
        
          "CO":null,
        
      
        
          "NO2":null,
        
      
        
          "O3":null,
        
      
        
          "SO2":null,
        
      
        
          "status":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceAirPollutionData.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "airPollutionDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "PM25":null,
        
      
        
          "PM10":null,
        
      
        
          "CO":null,
        
      
        
          "NO2":null,
        
      
        
          "O3":null,
        
      
        
          "SO2":null,
        
      
        
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
      $class: "org.acme.biznet.AirPollutionData",
      
        
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "PM25":this.PM25.value,
          
        
    
        
          
            "PM10":this.PM10.value,
          
        
    
        
          
            "CO":this.CO.value,
          
        
    
        
          
            "NO2":this.NO2.value,
          
        
    
        
          
            "O3":this.O3.value,
          
        
    
        
          
            "SO2":this.SO2.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceAirPollutionData.updateAsset(form.get("airPollutionDataId").value,this.asset)
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

    return this.serviceAirPollutionData.deleteAsset(this.currentId)
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

    return this.serviceAirPollutionData.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "airPollutionDataId":null,
          
        
          
            "location":null,
          
        
          
            "datetime":null,
          
        
          
            "PM25":null,
          
        
          
            "PM10":null,
          
        
          
            "CO":null,
          
        
          
            "NO2":null,
          
        
          
            "O3":null,
          
        
          
            "SO2":null,
          
        
          
            "status":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.airPollutionDataId){
          
            formObject.airPollutionDataId = result.airPollutionDataId;
          
        }else{
          formObject.airPollutionDataId = null;
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
      
        
          "airPollutionDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "PM25":null,
        
      
        
          "PM10":null,
        
      
        
          "CO":null,
        
      
        
          "NO2":null,
        
      
        
          "O3":null,
        
      
        
          "SO2":null,
        
      
        
          "status":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
