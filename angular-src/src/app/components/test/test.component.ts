import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

declare var google: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  cleartrip:String;

  constructor(){}


  ngOnInit() {

      }
  onSearchSubmit(){
    console.log(this.cleartrip);
  }
}


