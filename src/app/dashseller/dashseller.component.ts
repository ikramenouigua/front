import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appuser } from '../model/appuser.model';
import { Login } from '../model/login.model';
import { Offre } from '../model/offre.model';
import { User } from '../model/user.model';
import { OffresService } from '../services/offres.service';
import { RegistrationService } from '../services/registration.service';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-dashseller',
  templateUrl: './dashseller.component.html',
  styleUrls: ['./dashseller.component.css']
})
export class DashsellerComponent implements OnInit {

  @ViewChild('myForm') form!: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  public errors!: string [];
  private t: any;
  public addedUser : User = new User();
  public addedLogin : Login = new Login();
  parentSelector: boolean = false;
  public currentuser : Appuser = new Appuser();

  constructor(private registrationService: RegistrationService,private offerService: OffresService,
    private sharedService : SharedServiceService, private router : Router) { }

  async ngOnInit(){
    await this.getCurrentUser();
    
  }

  public async getCurrentUser(): Promise<void> {
    this.registrationService.getUser().subscribe(
     (response: Appuser) => {
       this.currentuser = response;
       console.log(this.currentuser.firstName);
       console.log(this.currentuser);
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 }

}
