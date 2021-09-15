import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
const API_URL = `${environment.apiUrl}`; @Injectable({
  providedIn: 'root'
})
export class CommmentpostService {

  constructor(private httpClient: HttpClient) { }
  createComment(id: any, commentPostCreate: any): Observable<any>{
    return this.httpClient.post(API_URL + '/api/auth/comment/create/' + `${id}`, commentPostCreate);
  }


  updateComment(id: any, commentPostCreate: any): Observable<any> {
    return this.httpClient.put(API_URL + '/api/auth/comment/update/' + `${id}`, commentPostCreate);
  }

  // xoa comment
  deleteComment(id: any): Observable<any>{
    return this.httpClient.delete(API_URL + '/api/auth/comment/delete/' + `${id}`);
  }

  // lay list comment theo id bai post
  getListComment(id: any): Observable<any>{
    return this.httpClient.get<any[]>(API_URL + '/api/auth/comment/' + id);
  }

  findById(id: any): Observable<any>{
    return  this.httpClient.get<any>(API_URL+ "/api/auth/comment/comment/"+id);
  }
}
