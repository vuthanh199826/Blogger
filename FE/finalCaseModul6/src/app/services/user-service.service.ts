import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './help';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  public addUser(user:any) {
    return this.http.post(`${baseUrl}/api/auth/signup`,user);
  }
}
