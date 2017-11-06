import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cars: any[];
  cols: any[];



  selectedCar1: any;

  selectedCar2: any;

  selectedCar3: any;

  selectedCars1: any[];

  selectedCars2: any[];

  selectedCars3: any[];

  constructor() { }


  onRowSelect(event) {

  }

  onRowUnselect(event) {
  }


  ngOnInit() {

    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];

    this.cars = [{
      "vin":"888",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    },{
      "vin":"123",
      "year":"546",
      "brand":"123",
      "color":"123"
    }];


  }



}
