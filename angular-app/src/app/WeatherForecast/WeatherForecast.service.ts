import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { WeatherForecast } from '../org.acme.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class WeatherForecastService {

	
		private NAMESPACE: string = 'WeatherForecast';
	



    constructor(private dataService: DataService<WeatherForecast>) {
    };

    public getAll(): Observable<WeatherForecast[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<WeatherForecast> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<WeatherForecast> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<WeatherForecast> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<WeatherForecast> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
