import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(  private authService:AuthService,
                private router:Router,
                private flashMessageService:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.show('You are logged out', {cssClass:'alert-success'});
    this.router.navigate(['/login']);
    return  false;
  }
}
