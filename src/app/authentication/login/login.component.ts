import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StringType } from '../../shared/model';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;

  public username = new FormControl(null, [Validators.required, Validators.maxLength(StringType.SmallText)]);
  public password = new FormControl(null, [Validators.required, Validators.minLength(StringType.TinyText)]);

  public loginForm: FormGroup = new FormGroup({
    Username: this.username,
    Password: this.password
  }); 

  constructor(private authService : AuthService) {
  }

  ngOnInit() {
  }

  public Submit() {
    if(this.loginForm.valid) {
      const groupValue = this.loginForm.value;

      const password = groupValue.Password;
      const username = groupValue.Username;

      const user: LoginModel  = {username, password};

      const loginSub = this.authService.login(user).subscribe(res => loginSub.unsubscribe());
    }
  }

  public changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signIn() {
    //this.authService
      //.login(this.model)
      //.subscribe();
  }

}
