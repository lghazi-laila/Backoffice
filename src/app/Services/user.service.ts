import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url : string;

  constructor(private httpClient: HttpClient) { 
    this.url = "http://localhost:8080/v1/users";
  }

  private getToken(): HttpHeaders {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return headers;
  }

  public getAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.url+'/all')
  }

  public getWithPagination(page:number, pageSize: number): Observable<User[]>{
    const headers = this.getToken();
    return this.httpClient.get<User[]>(`${this.url}?page=${page}&pageSize=${pageSize}`, {headers});
  }

  public getUserWithId(Id: string){
    const headers = this.getToken();
    return this.httpClient.get(`${this.url}/${Id}`, {headers});
  }

  public deleteUserWithId(Id : string){
    const headers = this.getToken();
    return this.httpClient.delete(`${this.url}/${Id}`, {headers})
  }

  public getUsersWithSort(page: number, pageSize: number, field: string, sort: string){
    const headers = this.getToken();
    return this.httpClient.get(`${this.url}/sort?page=${page}&pageSize=${pageSize}&field=${field}&sort=${sort}`, {headers})
  }

  public updateUser(Id: string, user : User){
    const headers = this.getToken();
    return this.httpClient.put(`${this.url}/${Id}`, user, {headers})
  }

  public searchUser(query: string, page: number, pageSize: number, field: string, sort: string){
    const headers = this.getToken();
    return this.httpClient.get(`${this.url}/search?query=${query}&page=${page}&pageSize=${pageSize}&field=${field}&sort=${sort}`, {headers})
  }
}
