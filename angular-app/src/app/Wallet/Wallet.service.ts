import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Wallet } from '../org.acme.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class WalletService {

	
		private NAMESPACE: string = 'Wallet';
	



    constructor(private dataService: DataService<Wallet>) {
    };

    public getAll(): Observable<Wallet[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Wallet> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Wallet> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Wallet> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Wallet> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
