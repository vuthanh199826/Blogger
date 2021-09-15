import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Like} from '../model/like';
import {Post} from '../model/post';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Like[]> {
    return this.httpClient.get<Like[]>(API_URL + '/api/likes');
  }

  create(like: Like, id: number): Observable<any> {
    return this.httpClient.post<Like>(API_URL + '/api/likes/create/' + id, like);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(API_URL + '/api/likes/delete/' + id);
  }

  checkLike(idUser: number, idPost: number): Observable<any> {
    return this.httpClient.get(API_URL + '/api/likes/search/' + idUser + '/' + idPost);
  }

  findTopLike(): Observable<Like[]> {
    return this.httpClient.get<Like[]>(API_URL + '/api/likes/search/top');
  }

  findLikeByIdPost(idPost: number): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/api/likes/search/' + idPost);
  }

  findTop5Like(): Observable<Like[]> {
    return this.httpClient.get<Like[]>(API_URL + '/api/likes/search/top5');
  }
}
