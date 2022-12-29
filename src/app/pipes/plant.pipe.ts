import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plant'
})
export class PlantPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    const sorted = value.sort((a,b)=>{
      let x = toDate(a.lastWater)
      let y = toDate(b.lastWater)
      return x - y;
    })
    return sorted;
  }

}

function toDate(x){
  return new Date(x).getDate();
}