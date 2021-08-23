import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://127.0.0.1:8000/api/auth";

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user){
    return this.http.post(this.URL + '/register', user);
  }
  signIn(user){
    return this.http.post(this.URL + '/login', user);
  }

  loggedIn (){
    return !!localStorage.getItem('elToken');

  }

  getToken(){
    return localStorage.getItem('elToken');
  }

  logout(){
    localStorage.removeItem('elToken');
    this.router.navigate(['/signin']);
  }

}
