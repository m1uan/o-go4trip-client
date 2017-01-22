import {Pipe} from '@angular/core';

@Pipe({name: 'g4tDuration'})
export class DurationPipe {
  transform (input:number, ...args: any[]) {
    
    let days = Math.floor(input/60/24);
    let daysMinutes = days*60*24;
    let hours = Math.floor((input-daysMinutes)/60);
    let hoursMinutes = hours*60;
    let minutes = input-daysMinutes-hoursMinutes;

    let result = '';

    if(days == 1){
      result += days + ' day '
    } else if(days > 1){
      result += days + ' days '
    }

    if(hours < 10){
      result += '0' + hours
    } else {
      result += hours
    }

    if(minutes < 10){
      result += ':0' + minutes
    } else {
      result += ':' + minutes
    }
    
    return result;
  }
}