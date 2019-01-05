import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './model/student';
 
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toString().toLowerCase();
   
    items.filter(function(it){
       return it.clas.toLowerCase().includes(searchText);
    });
  }
}  