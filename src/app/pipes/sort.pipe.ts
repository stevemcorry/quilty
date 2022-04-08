import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    // if(!value) return;
    // let sortA;
    // let sortB;
    // let newVals = value.sort((a:string,b:string)=>{
    //   sortA = a;
    //   sortB = b;
    //   if(a.startsWith('The')) sortA = a.replace('The ', '')
    //   if(b.startsWith('The')) sortB = b.replace('The ', '')
    //   if(a.startsWith('A ')) sortA = a.replace('A ', '')
    //   if(b.startsWith('A ')) sortB = b.replace('A ', '')
    //   if(sortA > sortB) return 1;
    //   if(sortA < sortB) return -1;
    //   return 0;
    // })

    // console.log({newVals})
    // return newVals;


    const sorted = value.sort((a,b)=>{ return stripIt(a) > stripIt(b) ? 1 : -1 })
    return sorted;

  }

}

function stripIt(name){
  return name.replace(/^(a |the |an )/i, '').trim();
}