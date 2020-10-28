import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signupUrl: string = `http://localhost:5000/api/users`;
  loginUrl: string = `http://localhost:5000/api/auth`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient,
    private router: Router) {
    if (localStorage.getItem('token') !== null) {
      this.loggedIn.next(true);
    }
  }

  isUserLogged(): boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    }
    else {
      return true;
    }
  }

  Signup(userData: User) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.signupUrl, JSON.stringify(userData), { headers: this.headers }).subscribe(res => {
        resolve(res);
        this.storeToken(res.token);
        this.loggedIn.next(true);
      }, err => reject(err));
    });
  }

  Login(userData: User) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.loginUrl, JSON.stringify(userData), { headers: this.headers }).subscribe(res => {
        resolve(res);
        this.storeToken(res.token);
        this.loggedIn.next(true);
      }, err => reject(err));
    })
  }

  Logout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      this.loggedIn.next(false);
    }
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserInfo(token: any) {
    var headers = new HttpHeaders().set("x-auth-token", token);
    const httpOptions = {
      headers: headers
    }
    return new Promise((resolve, reject) => {
      this.http.get(this.loginUrl, httpOptions).subscribe(
        res => resolve(res),
        err => { reject(err); console.log(err) });
    });
  }

}
