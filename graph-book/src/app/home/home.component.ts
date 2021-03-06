import { Component, OnInit, Injectable, Input} from '@angular/core';
import {HttpClient, HttpClientModule,HttpParams} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import {LoginComponent} from "../login/login.component"
import {CurrentUser} from "../currentUser"
import {LoginService} from "../login.service"
import { Student } from '../student';
import {ConnectionComponent} from "../connection/connection.component"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable({providedIn:'root'})
export class HomeComponent implements OnInit {

  //readonly pageUrl = 'https://graphbook-backend.herokuapp.com/students';
  readonly pageUrl = 'https://graphbook-backend.herokuapp.com/nonConnections';
  users: any; 
  connect: true;
  currentUser: Student;
  loginToken: boolean;
 
  
  constructor(private http:HttpClient, private data: LoginService) { }
    
    getUsers(): Observable<Object>{
      console.log("get users() works!")
      let body = new HttpParams();
      body = body.set('email', this.currentUser.emailAddress);
     // return this.users = this.http.get(this.pageUrl)
      return this.users = this.http.get(this.pageUrl, { params: body})
      
    }

    getAllPosts(): Observable<Object>{
      return this.http.get('https://jsonplaceholder.typicode.com/posts')
    }
    
    ngOnInit() {
      
      this.data.currentUser.subscribe(user=>this.currentUser=user)
      this.data.currentToken.subscribe(token=>this.loginToken=token)
      this.getUsers();
      console.log(this.currentUser);
    }

}
