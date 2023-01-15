import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appuser } from '../model/appuser.model';
import { OffresService } from '../services/offres.service';
import { RegistrationService } from '../services/registration.service';
import { SharedServiceService } from '../services/shared-service.service';
import { WinnerauctionService } from '../services/winnerauction.service';
import {Auctionwinner} from '../model/auctionwinner';

@Component({
  selector: 'app-notification-buyer',
  templateUrl: './notification-buyer.component.html',
  styleUrls: ['./notification-buyer.component.css']
})
export class NotificationBuyerComponent {
  public currentuser : Appuser = new Appuser();
  public auctionwinners:Array<Auctionwinner> = [];
  public etat :string
  public etataccepter :string
  public etatrefuser :string
  public logout : String=new String();


  constructor(private registrationService: RegistrationService, private sharedService : SharedServiceService,
    private offreService: OffresService ,private router : Router,private winnerAuctionService:WinnerauctionService){}

    
  public async getCurrentUser(): Promise<void> {
    this.registrationService.getUser().subscribe(
     (response: Appuser) => {
       this.currentuser = response;
       console.log(this.currentuser.firstName);
       console.log(this.currentuser);
       this.getNotification();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
  }
  public accepter(id:number):void{
    this.winnerAuctionService.accepterOffre(id).subscribe(
     (response:any)=>{

     }
    )
  }
  public refuser(id:number):void{
    this.winnerAuctionService.refuserOffre(id).subscribe(
     (response:any)=>{
      
     }
    )
  }

  public getNotification(): void {
    this.winnerAuctionService.getAuctionWinner(this.currentuser.id).subscribe(
      (response: Auctionwinner[]) => {
        this.auctionwinners = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  async ngOnInit() : Promise<void>{
    this.etat="notyet";
    this.etataccepter="accepter";
    this.etatrefuser="refuser";
   
    await this.getCurrentUser();
   
  }
  public getLogout(): void {
    this.registrationService.getLogout().subscribe(
      (response: String) => {
        this.logout = response;
        console.log(this.logout);
  
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.router.navigate(['/register']);
  }

}
