import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


/**
 * Generated class for the AppEditListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-edit-list',
  templateUrl: 'app-edit-list.html'
})

export class AppEditListComponent implements OnInit{
  canDelete = false;

  text: string;
  @Input() dataSet;
  @Input() dataFormat;
  @Output() editEvent = new EventEmitter();

  ngOnInit(){
    this.dataSet = this.objToList(this.dataSet, this.dataFormat);
    console.log(this.dataSet)
  }

  constructor() {
    console.log('Hello AppEditListComponent Component');
    this.text = 'Hello World';

  }


  objToList(obj, objFormat): any{
    return Object.keys(objFormat).reduce(function (acc,curr){
      acc.push({
        key: objFormat[curr].name,
        value: obj[curr],
        format: objFormat[curr].format,
        id: curr,
        edit: objFormat[curr].edit,
      })

      return acc;
    },[])
  }

  edit(key){
    this.editEvent.emit(key);
  }


}
