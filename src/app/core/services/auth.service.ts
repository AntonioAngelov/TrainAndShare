import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUpModel } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';

@Injectable()
export class AuthService extends BaseService {
  public readonly registerUrl = `https://baas.kinvey.com/user/${this.appKey}`;
  public readonly loginUrl = `https://baas.kinvey.com/user/${this.appKey}/login`;
  public readonly logoutUrl = `https://baas.kinvey.com/user/${this.appKey}/_logout`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  public register(body: SignUpModel) {
    return this.http.post(this.registerUrl, JSON.stringify(body));
  }

  public login(body: LoginModel) {
    return this.http.post(this.loginUrl, JSON.stringify(body));
  }


  public logout() {
    this.clearSession();
  }

  public checkIfLogged() {
    return this.getAuthtoken() !== null;
  }

  public getAuthtoken(): string {
    return localStorage.getItem('authToken');
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public getUserId(): string {
    return localStorage.getItem('userId');
  }

  public clearSession(): void {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
