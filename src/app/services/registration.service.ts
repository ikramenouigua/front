import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Login } from '../model/login.model';
import { Appuser } from '../model/appuser.model';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiServerURL=environment.apiBaseUrl2;
  model: any = {};
  sessionId: any = "";


  constructor(private http:HttpClient) { }
  public getUser():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/api/v1/registration/username`)
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerURL}/api/v1/registration/add`, user);
  }

  public loginUser(login: Login): Observable<Login> {
    console.log(login.usernameOrEmail+login.password+"nkljkljlknhjkhjk")
    return this.http.post<Login>(`${this.apiServerURL}/api/v1/registration/signin`, login);
  }

  public getUserlogin(login: any):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/api/v1/registration/signin`,login)
  }

  public getLogout():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/api/v1/registration/logout`)
  }
  public getUserbyid(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/api/v1/registration/getUser/${id}`)
  }

  public getUsers():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/api/v1/registration/allUser`)
  }
 

}
