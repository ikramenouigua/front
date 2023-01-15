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

  public availableoffers:any;
  public finishedoffers:any;
  public notstartedoffers:any;
  public offers:any;

  public avoffers:number;
  public fioffers:number;
  public nsoffers:number;
  public nboffers:number;

  

  constructor(private registrationService: RegistrationService,private offerService: OffresService,
    private sharedService : SharedServiceService, private router : Router,
    private offreService: OffresService) { }

  async ngOnInit(){
    this.fioffers=0;
    this.avoffers=0;
    this.nsoffers=0;
    await this.getCurrentUser();
   
    
  }

  public async getCurrentUser(): Promise<void> {
    this.registrationService.getUser().subscribe(
     (response: Appuser) => {
       this.currentuser = response;
       console.log(this.currentuser.firstName);
       console.log(this.currentuser);
       this.getAvailableOffres();
       this.getFinishedOffres();
       this.getNotStartedOffres();
       this.getNOffres();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 }

 public getAvailableOffres(): void {
  this.offreService.getOffersAvailablebyuser(this.currentuser.id).subscribe(
    (response: Offre[]) => {
      this.availableoffers = response;
      console.log("sala"+this.availableoffers.length)
      this.avoffers=this.availableoffers.length;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public getFinishedOffres(): void {
  this.offreService.getOffersFinishedbyuser(this.currentuser.id).subscribe(
    (response: Offre[]) => {
      this.finishedoffers = response;
      this.fioffers=this.finishedoffers.length;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public getNotStartedOffres(): void {
  this.offreService.getOffersNotStartedbyuser(this.currentuser.id).subscribe(
    (response: Offre[]) => {
      this.notstartedoffers = response;
      this.nsoffers=this.notstartedoffers.length;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public getNOffres(): void {
  this.offreService.getofferByIdUser(this.currentuser.id).subscribe(
    (response: Offre[]) => {
      this.offers = response;
      this.nboffers=this.offers.length;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

}
