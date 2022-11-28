import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private ValidateService: ValidateService, private flashMsg: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    // Check for empty fields
    if (!this.ValidateService.validateRegister(user)) {
      this.flashMsg.show("Fill in ALL required fields", {cssClass: 'alert-warning', timeout: 3000});
      return false;
    }
    // check for email format
    if (!this.ValidateService.validateEmail(user.email)) {
      this.flashMsg.show("Check email format", {cssClass: 'alert-warning', timeout: 3000});
      return false;
    }
  }
}
