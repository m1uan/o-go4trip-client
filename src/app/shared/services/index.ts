import {EviService} from './evi.service'
import {EviHttpService} from './evi.http.service';
import {SettingsService} from './settings.service';


export {EviService}  from './evi.service'
export * from './evi.http.service';
export * from './settings.service';

export let ALL_SHARED_SERVICES = [
    SettingsService,
    EviHttpService,
    
    

    // ops service cover some of shared service,
    // please keep it last
    EviService
]