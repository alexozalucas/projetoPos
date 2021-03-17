import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BrowserStack } from 'protractor/built/driverProviders';
import { GraficoService } from '../grafico-services';
import { Grafico } from "./grafico"
import { NgxMaskModule } from 'ngx-mask'

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @ViewChild("meuCanvas", { static: true }) elemento: ElementRef;
  chart: Chart
  dataSelecionada : boolean;
  grafico: Grafico[] = [];

  dataset: any
  constructor(
    private service: GraficoService

  ) {
    this.dataset = {
      label: '',
      data: [],
      borderColor: '',
      fontColor: '',
      fill: ''
    }

    

  }


  ngOnInit() {

      // todo o grafico funciona nesta instancia 
    this.chart = new Chart(this.elemento.nativeElement, {
      type: 'line',
      data: {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: []
      },
      options: {
        legend: {
          display: true
        }
      }
    });

  }


 
  buscarPorData(event) {
    var ano = event.target.value;

    if (ano.length == 4) {
      var dataInicial = "01/" + "01/"+ano;
      var dataFinal = "31" + "/12/" + ano;
      this.service.getAll(dataInicial, dataFinal)
        .subscribe(response => {
         this.grafico = response;
         this.dataSelecionada = true;
        }, reject => {
          this.dataSelecionada = false;
       
        })
    } else {
      this.dataSelecionada = false;
    }
  }



  recebido() {

    this.zerarDataset();
    var i = 0;
    var exists = false;
    this.chart.data.datasets.forEach(element => {
      if (element.label == "Recebido por Mês") {
        this.chart.data.datasets.splice(i, 1);
        exists = true;
      }
      i++;
    });

    if (exists == false) {
      this.dataset.label = "Recebido por Mês";
      this.dataset.borderColor = "#1E90FF";
      this.dataset.fill = false;      
      this.grafico.forEach(element =>{
        this.dataset.data.push(element.recebido);
      })
      this.chart.data.datasets.push(this.dataset);
    }
    this.chart.update();

  }



  desconto() {

    this.zerarDataset();
    var i = 0;
    var exists = false;
    this.chart.data.datasets.forEach(element => {
      if (element.label == "Descontos por mês") {
        this.chart.data.datasets.splice(i, 1);
        exists = true;
      }
      i++;
    });

    if (exists == false) {
      this.dataset.label = "Descontos por mês";
      this.dataset.borderColor = "#4F4F4F"
      this.dataset.fill = false
      this.grafico.forEach(element =>{
        this.dataset.data.push(element.desconto);
      })
      this.chart.data.datasets.push(this.dataset);

    }

    this.chart.update();
  }


  acrescimo() {

    this.zerarDataset();
    var i = 0;
    var exists = false;
    this.chart.data.datasets.forEach(element => {
      if (element.label == "Acréscimos por mês") {
        this.chart.data.datasets.splice(i, 1);
        exists = true;
      }
      i++;
    });

    if (exists == false) {
      this.dataset.label = "Acréscimos por mês";
      this.dataset.borderColor = "#32CD32"
      this.dataset.fill = false
      this.grafico.forEach(element =>{
        this.dataset.data.push(element.acrescimo);
      })
      this.chart.data.datasets.push(this.dataset);
    }

    this.chart.update();

  }



  servico() {

    this.zerarDataset();
    var i = 0;
    var exists = false;
    this.chart.data.datasets.forEach(element => {
      if (element.label == "Serviços por mês") {
        this.chart.data.datasets.splice(i, 1);
        exists = true;
      }
      i++;
    });

    if (exists == false) {
      this.dataset.label = "Serviços por mês";
      this.dataset.borderColor = "#FF0000"
      this.dataset.fill = false
      this.grafico.forEach(element =>{
        this.dataset.data.push(element.servico);
      })
      
      this.chart.data.datasets.push(this.dataset);
    }

    this.chart.update();

  }


  contrato() {


    this.zerarDataset();
    var i = 0;
    var exists = false;
    this.chart.data.datasets.forEach(element => {
      if (element.label == "Valor contratado") {
        this.chart.data.datasets.splice(i, 1);
        exists = true;
      }
      i++;
    });

    if (exists == false) {
      this.dataset.label = "Valor contratado";
      this.dataset.borderColor = "#FFFF00"
      this.dataset.fill = false
      this.grafico.forEach(element =>{
        this.dataset.data.push(element.contratado);
      })
      this.chart.data.datasets.push(this.dataset);
    }

    this.chart.update();

  }



  zerarDataset() {
    this.dataset = {
      label: '',
      data: [],
      borderColor: '',
      fill: ''
    }

  }




















  teste() {







    /*
        for(var i=0;i<12;i++){
          var x =i + 10;
          this.chart.data.datasets[2].data[i].add(i);      
          
        }
        */



    /* this.chart.data.datasets[1].label = "teste";
    for(var i=0;i<12;i++){
      var x =i + 10;
      this.chart.data.datasets[1].data[i] = x;
      console.log(i)
    

      
      this.chart.update();
    } */




  }












}
