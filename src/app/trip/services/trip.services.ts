import { Injectable } from '@angular/core';

import {EviService} from '../../shared/services/evi.service';
import {EviHttpService} from '../../shared/services/evi.http.service';

@Injectable()
export class TripService {

    constructor(evi: EviService, public http: EviHttpService){

    }

    createTrip(lat, lng, name, callback){

        this.http.post('trips', {lat, lng, name}).subscribe((data)=>{
            callback(data);
        });
    }

    loadTrip(id, uuid, callback){
        this.http.get('trips/' + id + '/' + uuid).subscribe((data)=>callback(data));
    }

    loadAllTrips(callback){
         this.http.get('trips/').subscribe((data)=>callback(data));
    }

    addPlaceToAlternative(lat, lng, name, uuid, callback){
        this.http.post('alternatives/' + uuid + '/places', {lat, lng, name}).subscribe((data)=>{
            callback(data);
        });
    }

    placeChangeOrder(uuid, placeid, neworder, callback){
        this.http.put('alternatives/' + uuid + '/places/' + placeid, {"order":neworder}).subscribe((data)=>{
            callback(data);
        });
    }

}