import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ExtendedData } from '../org.acme.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ExtendedDataService {

	
		private NAMESPACE: string = 'ExtendedData';
	



    constructor(private dataService: DataService<ExtendedData>) {
    };

    public getAll(): Observable<ExtendedData[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<ExtendedData> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<ExtendedData> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<ExtendedData> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<ExtendedData> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
