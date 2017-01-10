import {Pipe} from '@angular/core';

@Pipe({name: 'round'})
export class RoundPipe {
  transform (input:number, ...args: any[]) {
    let roundTo = 1;

    if(args.length>0){
      console.log(args,'args');
      let precise = Number(args[0]);

      if(precise == 1){
        roundTo = 10;
      } else if(precise == 2){
        roundTo = 100;
      } else if(precise == 3){
        roundTo = 1000;
      } else if(precise > 3){
        roundTo = 10;
        for(let i = 0; i < precise; i++){
          roundTo *= roundTo;
        }
      }
    }

    
    return Math.round(input*roundTo)/roundTo;;
  }
}