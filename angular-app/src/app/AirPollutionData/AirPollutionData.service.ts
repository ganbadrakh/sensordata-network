import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { AirPollutionData } from '../org.acme.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AirPollutionDataService {

	
		private NAMESPACE: string = 'AirPollutionData';
	



    constructor(private dataService: DataService<AirPollutionData>) {
    };

    public getAll(): Observable<AirPollutionData[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<AirPollutionData> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<AirPollutionData> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<AirPollutionData> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<AirPollutionData> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
