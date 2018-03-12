import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { WeatherForecastService } from './WeatherForecast.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-WeatherForecast',
	templateUrl: './WeatherForecast.component.html',
	styleUrls: ['./WeatherForecast.component.css'],
  providers: [WeatherForecastService]
})
export class WeatherForecastComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          weatherForecastId = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          tempUnit = new FormControl("", Validators.required);
        
  
      
          tempTomorrow = new FormControl("", Validators.required);
        
  
      
          humidityTomorrow = new FormControl("", Validators.required);
        
  
      
          conditionTomorrow = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceWeatherForecast:WeatherForecastService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          weatherForecastId:this.weatherForecastId,
        
    
        
          location:this.location,
        
    
        
          datetime:this.datetime,
        
    
        
          tempUnit:this.tempUnit,
        
    
        
          tempTomorrow:this.tempTomorrow,
        
    
        
          humidityTomorrow:this.humidityTomorrow,
        
    
        
          conditionTomorrow:this.conditionTomorrow,
        
    
        
          status:this.status,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceWeatherForecast.getAll()
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
      $class: "org.acme.biznet.WeatherForecast",
      
        
          "weatherForecastId":this.weatherForecastId.value,
        
      
        
          "location":this.location.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "tempUnit":this.tempUnit.value,
        
      
        
          "tempTomorrow":this.tempTomorrow.value,
        
      
        
          "humidityTomorrow":this.humidityTomorrow.value,
        
      
        
          "conditionTomorrow":this.conditionTomorrow.value,
        
      
        
          "status":this.status.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "weatherForecastId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "tempUnit":null,
        
      
        
          "tempTomorrow":null,
        
      
        
          "humidityTomorrow":null,
        
      
        
          "conditionTomorrow":null,
        
      
        
          "status":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceWeatherForecast.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "weatherForecastId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "tempUnit":null,
        
      
        
          "tempTomorrow":null,
        
      
        
          "humidityTomorrow":null,
        
      
        
          "conditionTomorrow":null,
        
      
        
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
      $class: "org.acme.biznet.WeatherForecast",
      
        
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "tempUnit":this.tempUnit.value,
          
        
    
        
          
            "tempTomorrow":this.tempTomorrow.value,
          
        
    
        
          
            "humidityTomorrow":this.humidityTomorrow.value,
          
        
    
        
          
            "conditionTomorrow":this.conditionTomorrow.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceWeatherForecast.updateAsset(form.get("weatherForecastId").value,this.asset)
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

    return this.serviceWeatherForecast.deleteAsset(this.currentId)
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

    return this.serviceWeatherForecast.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "weatherForecastId":null,
          
        
          
            "location":null,
          
        
          
            "datetime":null,
          
        
          
            "tempUnit":null,
          
        
          
            "tempTomorrow":null,
          
        
          
            "humidityTomorrow":null,
          
        
          
            "conditionTomorrow":null,
          
        
          
            "status":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.weatherForecastId){
          
            formObject.weatherForecastId = result.weatherForecastId;
          
        }else{
          formObject.weatherForecastId = null;
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
      
        if(result.tempUnit){
          
            formObject.tempUnit = result.tempUnit;
          
        }else{
          formObject.tempUnit = null;
        }
      
        if(result.tempTomorrow){
          
            formObject.tempTomorrow = result.tempTomorrow;
          
        }else{
          formObject.tempTomorrow = null;
        }
      
        if(result.humidityTomorrow){
          
            formObject.humidityTomorrow = result.humidityTomorrow;
          
        }else{
          formObject.humidityTomorrow = null;
        }
      
        if(result.conditionTomorrow){
          
            formObject.conditionTomorrow = result.conditionTomorrow;
          
        }else{
          formObject.conditionTomorrow = null;
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
      
        
          "weatherForecastId":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "tempUnit":null,
        
      
        
          "tempTomorrow":null,
        
      
        
          "humidityTomorrow":null,
        
      
        
          "conditionTomorrow":null,
        
      
        
          "status":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
