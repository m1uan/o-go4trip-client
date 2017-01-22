
// manage imports here 
import {RoundPipe} from './round.pipe';
import  {DurationPipe} from './duration.pipe';

export {RoundPipe} from './round.pipe';
export {DurationPipe} from './duration.pipe';

export let ALL_SHARED_PIPES = [
    // add shared somponents here
    RoundPipe,
    DurationPipe
    // LocalizePipe,
    // LocalizeDatePipe,
    // NumeralPipe
]