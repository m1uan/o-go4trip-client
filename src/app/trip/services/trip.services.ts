import { Injectable } from '@angular/core';

import {EviService} from '../../shared/services/evi.service';
import {EviHttpService} from '../../shared/services/evi.http.service';


export const AVOID_TOLLS = (1 << 5);
export const AVOID_HIGHWAYS = (1 << 6);
export const AVOID_FERRIES = (1 << 7);
export const TRANSPORT_MASK = 15; // 000000001111

export const KEY_TRANSPORT_MODE_CAR = 0;
export const KEY_TRANSPORT_MODE_WALK = 1;
export const KEY_TRANSPORT_MODE_BIKE = 2;
export const KEY_TRANSPORT_MODE_HH = 3;
export const KEY_TRANSPORT_MODE_FLIGHT = 4;


@Injectable()
export class TripService {
    lastPlace : any = null;
    places : Array<any> = [];

    public tripId;
    public alternativeUuid;

    constructor(public evi: EviService, public http: EviHttpService){

    }

    createTrip(lat, lng, name, googlePlaceId, transpartType, callback){

        this.http.post('trips', {lat, lng, name, googlePlaceId}).subscribe((data)=>{
            callback(data);
        });
    }

    loadTrip(tripUuid, waysUuid, callback){
        this.tripId = tripUuid;
        this.alternativeUuid = waysUuid;

        this.http.get('trips/' + this.tripId + (waysUuid ? '/ways/' + waysUuid : '')).subscribe((data)=>{
            
            this.updatePlaces(data.current.placesmoves)
            callback(data)
            
        });
    }

    loadAllTrips(callback){
         this.http.get('trips/').subscribe((data)=>callback(data));
    }

    addPlaceToAlternative(lat, lng, name, uuid, index, googlePlaceId, transport_type, callback = null){
        let before = transport_type;
        transport_type = transport_type + AVOID_TOLLS + AVOID_FERRIES + AVOID_HIGHWAYS;


        console.log('transport_type = transport_type + (1 << 4):'+transport_type, before, transport_type & 7);


        let postData = {
            lat, 
            lng, 
            name,
            googlePlaceId,
            transport_type
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
                lat: indexPlace.infoplace.place.lat_round/1000,
                lng: indexPlace.infoplace.place.lng_round/1000
            }]);

        } else if(this.lastPlace && this.lastPlace.place){
        
            // add place to end, 
            // but show in locatin of lat lng of last place

            this.evi.navigate(['/place', this.tripId, 'alternative', this.alternativeUuid, 'new', {
                lat: this.lastPlace.infoplace.place.lat_round/1000,
                lng: this.lastPlace.infoplace.place.lng_round/1000
            }]);

        } else {
        
            // add place to end
            // show current location from browser
            this.evi.navigate(['/place', this.tripId, 'alternative', this.alternativeUuid, 'new']);
        }

    }

    public getAlternative(uuid, callback){
        
        this.alternativeUuid = uuid;

        this.http.get('trip/ways/' + uuid).subscribe(data=>callback(data.loaded));
    }

    public cloneAlternative(alternativeUuid, reverse, callback = null){
        if(!callback){
            callback = reverse;
            reverse = false;
        }

        var postData = {
            reverse : reverse
        }

        this.http.post('trip/ways/'+alternativeUuid+'/clone', postData).subscribe((data)=>{
            callback(data.alternative);
        });
    }

    public createTripFromTripWay(alternativeUuid, reverse, callback = null){
        if(!callback){
            callback = reverse;
            reverse = false;
        }

        var postData = {
            reverse : reverse
        }

        this.http.post('trip/ways/'+alternativeUuid+'/new_trip', postData).subscribe((data)=>{
            callback(data.trips);
        });
    }

    public deleteTripWay(wayUuid, callback = null){
        

        this.http.delete('trip/ways/'+wayUuid).subscribe((data)=>{
            callback();
        });
    }

    public updateTripWay(way, callback = null){
        console.log('updateTripWay(way', way)
        let wayForUpdate = {
            name : way.name,
            desc : way.desc,
            price_transport : way.price_transport,
            price_transport_code : way.price_transport_code
        }

        this.http.put('trip/ways/'+way.uuid, wayForUpdate).subscribe((data)=>{
            callback(data);
        });
    }

    public setTripWayAsMain(uuid, callback = null){
        

        this.http.post('trip/ways/'+uuid+'/main', {}).subscribe((data)=>{
            callback(data);
        });
    }


    public setTripReturnBack(tripUuid, tripWayUuid, returnBack, callback){
        this.http.put('trips/'+tripUuid+ '/way/'+ tripWayUuid +'/returnBack', {returnBack}).subscribe((data)=>{
            callback(data);
        });
    }

    public checkPhotosForKeywords(keywords, googlePlaceId, callback){
        this.http.post('trips/images', {keywords, googlePlaceId}).subscribe((data)=>{
            callback(data);
        });
    }

}