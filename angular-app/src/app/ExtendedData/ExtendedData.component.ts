import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ExtendedDataService } from './ExtendedData.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ExtendedData',
	templateUrl: './ExtendedData.component.html',
	styleUrls: ['./ExtendedData.component.css'],
  providers: [ExtendedDataService]
})
export class ExtendedDataComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          extendedDataId = new FormControl("", Validators.required);
        
  
      
          dataFrom = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          PM25_Concentration = new FormControl("", Validators.required);
        
  
      
          AQIndex = new FormControl("", Validators.required);
        
  
      
          level = new FormControl("", Validators.required);
        
  
      
          healthImplications = new FormControl("", Validators.required);
        
  
      
          cautionaryStatement = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          ownerEntity = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceExtendedData:ExtendedDataService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          extendedDataId:this.extendedDataId,
        
    
        
          dataFrom:this.dataFrom,
        
    
        
          location:this.location,
        
    
        
          datetime:this.datetime,
        
    
        
          PM25_Concentration:this.PM25_Concentration,
        
    
        
          AQIndex:this.AQIndex,
        
    
        
          level:this.level,
        
    
        
          healthImplications:this.healthImplications,
        
    
        
          cautionaryStatement:this.cautionaryStatement,
        
    
        
          status:this.status,
        
    
        
          ownerEntity:this.ownerEntity,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceExtendedData.getAll()
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
      $class: "org.acme.biznet.ExtendedData",
      
        
          "extendedDataId":this.extendedDataId.value,
        
      
        
          "dataFrom":this.dataFrom.value,
        
      
        
          "location":this.location.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "PM25_Concentration":this.PM25_Concentration.value,
        
      
        
          "AQIndex":this.AQIndex.value,
        
      
        
          "level":this.level.value,
        
      
        
          "healthImplications":this.healthImplications.value,
        
      
        
          "cautionaryStatement":this.cautionaryStatement.value,
        
      
        
          "status":this.status.value,
        
      
        
          "ownerEntity":this.ownerEntity.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "extendedDataId":null,
        
      
        
          "dataFrom":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "PM25_Concentration":null,
        
      
        
          "AQIndex":null,
        
      
        
          "level":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "ownerEntity":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceExtendedData.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "extendedDataId":null,
        
      
        
          "dataFrom":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "PM25_Concentration":null,
        
      
        
          "AQIndex":null,
        
      
        
          "level":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "ownerEntity":null,
        
      
        
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
      $class: "org.acme.biznet.ExtendedData",
      
        
          
        
    
        
          
            "dataFrom":this.dataFrom.value,
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "PM25_Concentration":this.PM25_Concentration.value,
          
        
    
        
          
            "AQIndex":this.AQIndex.value,
          
        
    
        
          
            "level":this.level.value,
          
        
    
        
          
            "healthImplications":this.healthImplications.value,
          
        
    
        
          
            "cautionaryStatement":this.cautionaryStatement.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "ownerEntity":this.ownerEntity.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceExtendedData.updateAsset(form.get("extendedDataId").value,this.asset)
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

    return this.serviceExtendedData.deleteAsset(this.currentId)
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

    return this.serviceExtendedData.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "extendedDataId":null,
          
        
          
            "dataFrom":null,
          
        
          
            "location":null,
          
        
          
            "datetime":null,
          
        
          
            "PM25_Concentration":null,
          
        
          
            "AQIndex":null,
          
        
          
            "level":null,
          
        
          
            "healthImplications":null,
          
        
          
            "cautionaryStatement":null,
          
        
          
            "status":null,
          
        
          
            "ownerEntity":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.extendedDataId){
          
            formObject.extendedDataId = result.extendedDataId;
          
        }else{
          formObject.extendedDataId = null;
        }
      
        if(result.dataFrom){
          
            formObject.dataFrom = result.dataFrom;
          
        }else{
          formObject.dataFrom = null;
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
      
        if(result.ownerEntity){
          
            formObject.ownerEntity = result.ownerEntity;
          
        }else{
          formObject.ownerEntity = null;
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
      
        
          "extendedDataId":null,
        
      
        
          "dataFrom":null,
        
      
        
          "location":null,
        
      
        
          "datetime":null,
        
      
        
          "PM25_Concentration":null,
        
      
        
          "AQIndex":null,
        
      
        
          "level":null,
        
      
        
          "healthImplications":null,
        
      
        
          "cautionaryStatement":null,
        
      
        
          "status":null,
        
      
        
          "ownerEntity":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
