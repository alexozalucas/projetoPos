import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: any[];
  options: any;
  paginaAtual: number = 0;
  dataInicial: string;
  dataFinal: string;


  constructor() { }

  ngOnInit() {

    this.dataInicial = "01/01/2021";
    this.dataFinal = "10/01/2021"

  }


  // toggleWeekends() {
  //   //this.calendarOptions.weekends = !this.calendarOptions.weekends // Não mostra os finais de semana
  //   //this.calendarOptions.weekNumbers = !this.calendarOptions.weekNumbers // Demonstrar o número da semana
  // }

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr) // quando se clica em uma data
  // }

  // calendarOptions: CalendarOptions = {   
   
  //   initialView: 'dayGridWeek',
  //   fixedWeekCount: true, // Contabiliza 6 semanas no calendário
  //   locale: 'pt-br',      // tradução 
  //   slotLabelFormat: 'HH:mm', // 
  //   allDayText: '24 horas',   // 
  //   weekNumbers: true, // Demonstra a semana
  //   weekText: 'Semana ',
    
  //   headerToolbar: {
  //     left: '',     
  //     center: 'title',
  //     right: 'prev,next,today'
  //   },
    
  //   dateClick: this.handleDateClick.bind(this), // Ao clicar aparece a data
  //   buttonText: {
  //     today: 'Hoje'
  //   },
  //   height: 'auto',
  //   navLinks: true, // Link ao clicar no número
  //   editable: true,

   

  //   events: [
  //     {
  //       title: 'Armazém',
  //       start: '2021-05-10',
  //     },
  //     {
  //       title: 'José',
  //       start: '2021-05-12T16:01:00',
  //       end: '2021-05-14T16:05:22'
  //     },
  //     {
  //       title: 'Armazém',
  //       start: '2021-05-10',
  //     },
  //     {
  //       title: 'José',
  //       start: '2021-05-12T16:01:00',
  //       end: '2021-05-14T16:05:22'
  //     },
  //     {
  //       groupId: '999',
  //       title: 'Repeating Event',
  //       start: '2018-01-09T16:00:00'
  //     },
  //     {
  //       groupId: '999',
  //       title: 'Repeating Event',
  //       start: '2020-05-05T16:00:00'
  //     },
  //     {
  //       title: 'Lunch',
  //       start: '2018-01-12T12:00:00'
  //     },      
  //     {
  //       title: 'Click for Google',
  //       url: 'http://google.com/',
  //       start: '2018-01-28'
  //     }
  //   ]
  

   
   
  
  


  

}
