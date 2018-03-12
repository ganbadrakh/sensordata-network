import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { WeatherDataService } from './WeatherData.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-WeatherData',
	templateUrl: './WeatherData.component.html',
	styleUrls: ['./WeatherData.component.css'],
  providers: [WeatherDataService]
})
export class WeatherDataComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          weatherDataId = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          currentCondition = new FormControl("", Validators.required);
        
  
      
          tempUnit = new FormControl("", Validators.required);
        
  
      
          currentTemp = new FormControl("", Validators.required);
        
  
      
          currentHumidity = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceWeatherData:WeatherDataService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          weatherDataId:this.weatherDataId,
        
    
        
          location:this.location,
        
    
        
          datetime:this.datetime,
        
    
        
          currentCondition:this.currentCondition,
        
    
        
          tempUnit:this.tempUnit,
        
    
        
          currentTemp:this.currentTemp,
        
    
        
          currentHumidity:this.currentHumidity,
        
    
        
          status:this.status,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceWeatherData.getAll()
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
      $class: "org.acme.biznet.WeatherData",
      
        
          "weatherDataId":this.weatherDataId.value,
        
      
        
          "location":this.location.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "currentCondition":this.currentCondition.value,
        
      
        
          "tempUnit":this.tempUnit.value,
        
      
        
          "currentTemp":this.currentTemp.value,
        
      
        
          "currentHumidity":this.currentHumidity.value,
        
      
        
          "status":this.status.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "weatherDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "currentCondition":null,
        
      
        
          "tempUnit":null,
        
      
        
          "currentTemp":null,
        
      
        
          "currentHumidity":null,
        
      
        
          "status":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceWeatherData.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "weatherDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "currentCondition":null,
        
      
        
          "tempUnit":null,
        
      
        
          "currentTemp":null,
        
      
        
          "currentHumidity":null,
        
      
        
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
      $class: "org.acme.biznet.WeatherData",
      
        
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "currentCondition":this.currentCondition.value,
          
        
    
        
          
            "tempUnit":this.tempUnit.value,
          
        
    
        
          
            "currentTemp":this.currentTemp.value,
          
        
    
        
          
            "currentHumidity":this.currentHumidity.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceWeatherData.updateAsset(form.get("weatherDataId").value,this.asset)
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

    return this.serviceWeatherData.deleteAsset(this.currentId)
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

    return this.serviceWeatherData.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "weatherDataId":null,
          
        
          
            "location":null,
          
        
          
            "datetime":null,
          
        
          
            "currentCondition":null,
          
        
          
            "tempUnit":null,
          
        
          
            "currentTemp":null,
          
        
          
            "currentHumidity":null,
          
        
          
            "status":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.weatherDataId){
          
            formObject.weatherDataId = result.weatherDataId;
          
        }else{
          formObject.weatherDataId = null;
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
      
        if(result.currentCondition){
          
            formObject.currentCondition = result.currentCondition;
          
        }else{
          formObject.currentCondition = null;
        }
      
        if(result.tempUnit){
          
            formObject.tempUnit = result.tempUnit;
          
        }else{
          formObject.tempUnit = null;
        }
      
        if(result.currentTemp){
          
            formObject.currentTemp = result.currentTemp;
          
        }else{
          formObject.currentTemp = null;
        }
      
        if(result.currentHumidity){
          
            formObject.currentHumidity = result.currentHumidity;
          
        }else{
          formObject.currentHumidity = null;
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
      
        
          "weatherDataId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "currentCondition":null,
        
      
        
          "tempUnit":null,
        
      
        
          "currentTemp":null,
        
      
        
          "currentHumidity":null,
        
      
        
          "status":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
