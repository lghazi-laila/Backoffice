import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequest } from '../Models/SignInRequest';
import { Observable, finalize, tap } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private authURL: string = 'http://localhost:8080/v1/users/login';
  private token: string = "";

  constructor(private httpClient: HttpClient) { }

  authenticate(email: string , password: string): Observable<any> {
    const data = {email, password};
    console.log(data);
    return this.httpClient.post(this.authURL, data).pipe(
      tap((response: any) => { 
        console.log('Login response:', response);   
        if (response && response.data && response.data.token) {
          this.setToken(response.data.token);
        }
      }),
      finalize(() => {
        console.log('HTTP request completed.');
      })
    ) 
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    console.log('Token saved:', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

}
