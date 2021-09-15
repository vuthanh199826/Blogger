import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginForm} from '../model/login-form';
import {JwtResponse} from '../model/jwt-response';
import {RegisterForm} from '../model/register-form';
import { FormGroup } from '@angular/forms';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(login: LoginForm):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(API_URL+'/api/auth/signin', login);
  }
  register(register: RegisterForm):Observable<any>{
    return this.http.post(API_URL+'/api/auth/signup', register);
  }
  getAddress():Observable<any>{
    return this.http.get<any>('https://provinces.open-api.vn/api/')
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
}
}
