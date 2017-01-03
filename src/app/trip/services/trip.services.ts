import { Injectable } from '@angular/core';

import {EviService} from '../../shared/services/evi.service';
import {EviHttpService} from '../../shared/services/evi.http.service';

@Injectable()
export class TripService {
    lastPlace : any = null;
    places : Array<any> = [];

    public tripId;
    public alternativeUuid;

    constructor(public evi: EviService, public http: EviHttpService){

    }

    createTrip(lat, lng, name, callback){

        this.http.post('trips', {lat, lng, name}).subscribe((data)=>{
            callback(data);
        });
    }

    loadTrip(tripId, alternativeUuid, callback){
        this.tripId = tripId;
        this.alternativeUuid = alternativeUuid;

        this.http.get('trips/' + this.tripId + '/' + this.alternativeUuid).subscribe((data)=>{
            
            this.updatePlaces(data.alternatives.placesmoves)
            callback(data)
            
        });
    }

    loadAllTrips(callback){
         this.http.get('trips/').subscribe((data)=>callback(data));
    }

    addPlaceToAlternative(lat, lng, name, uuid, index, callback = null){
        let postData = {
            lat, 
            lng, 
            name
        }

        if(!callback){
            callback = index;
            index = -1;
        } else if(index != undefined && index != null && index > -1) {
            postData.order = Number(index) + 1;
        }

        

        this.http.post('alternatives/' + uuid + '/places', postData).subscribe((data)=>{
            
            this.updatePlaces(data.places);
            callback(data)
            
        });
    }

    placeChangeOrder(uuid, placeid, neworder, callback){
        this.http.put('alternatives/' + uuid + '/places/' + placeid, {"order":neworder}).subscribe((data)=>{
            
            this.updatePlaces(data.places);
            callback(data)
            
        });
    }

    placeStayover(uuid, placeid, stayover, callback){
        this.http.put('alternatives/' + uuid + '/places/' + placeid, {stayover}).subscribe((data)=>{
            callback(data);
        });
    }

    placeDelete(uuid, placeid, callback){
        this.http.delete('alternatives/' + uuid + '/places/' + placeid).subscribe((data)=>{
            
            this.updatePlaces(data.places);
            callback(data)
            
        });
    }

    public updatePlaces(places){
        this.places = places;
        let lastPlace = places[this.places.length-1];

        // the button add new place on the end of page
        // need coordination on map show where we end
        if(lastPlace && lastPlace){
            this.lastPlace = lastPlace;
        } else {
            this.lastPlace = null;
        }

    }

    public onNewPlace(index = -1){

        if(index > -1){
        
            // add place to index and also
            // show in locatin of lat lng of index place

            let indexPlace = this.places[index];

            this.evi.navigate(['/place', this.tripId, 'alternative', this.alternativeUuid, 'after', index, {
                lat:indexPlace.place.lat_round/1000,
                lng: indexPlace.place.lng_round/1000
            }]);

        } else if(this.lastPlace && this.lastPlace.place){
        
            // add place to end, 
            // but show in locatin of lat lng of last place

            this.evi.navigate(['/place', this.tripId, 'alternative', this.alternativeUuid, 'new', {
                lat:this.lastPlace.place.lat_round/1000,
                lng: this.lastPlace.place.lng_round/1000
            }]);

        } else {
        
            // add place to end
            // show current location from browser
            this.evi.navigate(['/place', this.tripId, 'alternative', this.alternativeUuid, 'new']);
        }

    
  }

}