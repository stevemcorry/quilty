import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plant'
})
export class PlantPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(args[0] && args[0] == 'active'){
      value = value.filter((plant)=>{
        return plant.active
      })
    } else {
      value = value.filter((plant)=>{
        return !plant.active
      })
      return value;
    }

    //sort by lastWater property
    console.log(args[2])
    let sorted;
    if(args[1] == 'lastWater'){
      sorted = sortByWateredDate(value, args[2]);
    } else if(args[1] == 'birthdate'){
      sorted = sortByBirthdate(value, args[2]);
    } else {
      sorted = sortByName(value, args[2]);
    }
    console.log({sorted})
    return sorted;
  }

}

function sortByWateredDate(value, arg){
  return value.sort((a, b) => {
    if(a.lastWater == null) return arg == 'desc' ? -1 : 1;
    if(b.lastWater == null) return arg == 'desc' ? -1 : 1;
    if(arg == 'desc'){
      return new Date(a.lastWater.date).getTime() - new Date(b.lastWater.date).getTime();
    }
    return new Date(b.lastWater.date).getTime() - new Date(a.lastWater.date).getTime();
  });
}

function sortByName(value, arg){
  return value.sort((a, b) => {
    if(arg == 'asc'){
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });
}

function sortByBirthdate(value, arg){
  return value.sort((a, b) => {
    if(arg == 'asc'){
      return new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime();
    }
    return new Date(b.birthdate).getTime() - new Date(a.birthdate).getTime();
  });
}