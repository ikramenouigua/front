import { Injectable } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { Appuser } from '../model/appuser.model';
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  message : Appuser


  constructor() { }

  setMessage(data: Appuser){
    this.message=data;
  }
  getMessage(){
    return this.message
  }
  
}
