import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { AirQualityData } from '../org.acme.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AirQualityDataService {

	
		private NAMESPACE: string = 'AirQualityData';
	



    constructor(private dataService: DataService<AirQualityData>) {
    };

    public getAll(): Observable<AirQualityData[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<AirQualityData> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<AirQualityData> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<AirQualityData> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<AirQualityData> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
