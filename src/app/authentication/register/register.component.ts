import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StringType } from '../../shared/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public showPassword: boolean;

  public username = new FormControl(null, [Validators.required, Validators.maxLength(StringType.SmallText)]);
  public firstName = new FormControl(null, [Validators.required]);
  public lastName = new FormControl(null, []);
  public email = new FormControl(null, [Validators.required, Validators.email]);
  public password = new FormControl(null, [Validators.required, Validators.minLength(StringType.TinyText)]);

  public registrationForm: FormGroup = new FormGroup({
    Username: this.username,
    FirstName: this.firstName,
    LastName: this.lastName,
    Email: this.email,
    Password: this.password
  });

  constructor(
    private authService: AuthService) {
  }

  ngOnInit() {
  }

  public test(asd) {
  }

  public Submit() {
    if (this.registrationForm.valid) {
      const groupValue = this.registrationForm.value;

      const firstName = groupValue.FirstName;
      const lastName = groupValue.LastName;
      const email = groupValue.Email;
      const password = groupValue.Password;
      const username = groupValue.Username;

      const user = {firstName, lastName, email, password, username};

      const regSub: Subscription = this.authService.register(user).subscribe(res => regSub.unsubscribe());
    }
  }

  public changePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    /*this.authService
      .register(this.model)
      .subscribe();
      */
  }

}
