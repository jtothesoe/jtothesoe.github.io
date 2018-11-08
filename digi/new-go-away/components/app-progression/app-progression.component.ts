import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progression',
  templateUrl: './app-progression.component.html',
  styleUrls: ['./app-progression.component.scss']
})
export class AppProgressionComponent implements OnInit{

  
  @Input() completed; 
  @Input() maxProgressionLength;
  progressionArray = [];


  constructor() {
    
    
  }

  ngOnInit(){
    this.fillProgressionArray()
  }

  fillProgressionArray(){
    for(let i = 0; i < this.maxProgressionLength; i++){
      if(this.completed > i)
        this.progressionArray.push(true)
      else
        this.progressionArray.push(false)
    }
  }

}
