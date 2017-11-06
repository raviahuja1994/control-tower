import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessageService:FlashMessagesService
  ) {
  }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessageService.show('You are now logged in', {cssClass:'alert-success'});
        this.router.navigate(['']);
      }else{
        this.flashMessageService.show(data.msg, {cssClass:'alert-danger'});
        this.router.navigate(['login']);
      }
    });
  }

}
