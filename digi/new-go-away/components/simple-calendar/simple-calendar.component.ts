import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as calendar from 'node-calendar';
import * as moment from 'moment';

@Component({
  selector: 'simple-calendar',
  templateUrl: './simple-calendar.component.html',
  styleUrls: ['./simple-calendar.component.scss']
})
export class SimpleCalendarComponent implements OnInit{
  @Input() styles: any;
  @Output() dateSelectionEvent = new EventEmitter();
  days;
  date = new Date();
  currentMonth;
  currentYear;
  monthText;
  payDay;
  selectedDate;
  months = ['Januray', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentDate = new Date();

  constructor() {
  }

  ngOnInit(){
    this.setDays();
    this.initDate();
  }

  initDate(){
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.currentDate.setHours(0,0,0,0);
  }

  changeMonth(updateType){ 
    if(updateType === 'up'){
      if(this.currentMonth === 11){
        this.currentMonth = 0;
        this.currentYear++;
      }
        
      else
        this.currentMonth++;
    }
    else{
      if(this.currentMonth === 0){
        this.currentMonth = 11;
        this.currentYear--;
      }
        
      else
        this.currentMonth--;
    }
  }

  setDays(month = this.date.getMonth(), year= this.date.getFullYear()){
    this.days = new calendar.Calendar().itermonthdays(year, month+1);
    let daysLength = this.getDaysLength();

    //Check and remove first row if all zeros
    this.removeZeroRow(0, 7);

    //Check and remove last row if all zeros
    this.removeZeroRow(daysLength-7, daysLength);

    this.monthText = this.months[month];
    
  }

  getDaysLength(){
    return this.days.reduce((acc)=> acc+1,0);
  }

  removeZeroRow(start, end){
    let zeroCheck = this.days.slice(start, end);

    if(zeroCheck.every((values)=>values === 0))
      this.days.splice(start, end-start+1);
    
  }

  updateCalendar(updateType){
    this.changeMonth(updateType);
    this.setDays(this.currentMonth, this.currentYear);
    this.selectedDate = null;
    this.dateSelectionEvent.emit(null);
  }

  selectDate(i, day){
    if(day > 0){
      let date = new Date(this.currentYear, this.currentMonth, day);

      if(this.currentDate <= date){
        this.selectedDate = i;
        let  formattedDate = moment(date).format('YYYY-MM-DD');
        this.dateSelectionEvent.emit(formattedDate);
      }
    }
  }

  grayOutDate(day){
    let date = new Date(this.currentYear, this.currentMonth, day);
    if(this.currentDate <= date){
      return false;
    }

    return true;
  }

}
