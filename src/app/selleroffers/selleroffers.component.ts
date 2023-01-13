import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appuser } from '../model/appuser.model';
import { Login } from '../model/login.model';
import { Offre } from '../model/offre.model';
import { User } from '../model/user.model';
import { AuctionService } from '../services/auction.service';
import { OffresService } from '../services/offres.service';
import { RegistrationService } from '../services/registration.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-selleroffers',
  templateUrl: './selleroffers.component.html',
  styleUrls: ['./selleroffers.component.css']
})
export class SelleroffersComponent implements OnInit {
  public errors!: string [];
  private t: any;
  public addedUser : User = new User();
  public addedLogin : Login = new Login();
  public offres : Array<Offre> = [];
  parentSelector: boolean = false;
  public currentuser : Appuser = new Appuser();
  public users : Array<User> = [];
  postResponse: any;
  postResponse1: any;

  constructor(private sharedService : SharedServiceService,
    private offreService: OffresService,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private auctionService: AuctionService
    ,private httpClient: HttpClient) { }

    public async getCurrentUser(): Promise<void> {
      this.registrationService.getUser().subscribe(
       (response: Appuser) => {
         this.currentuser = response;
         console.log(this.currentuser)
         console.log("haa id1"+this.currentuser.id)
         this.getOfferByIdUser();
         
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
    

    }

    public getOfferByIdUser(): void {
      
      console.log("uhijo")
     
      console.log("haa id"+this.currentuser.id)

      this.offreService.getofferByIdUser(this.currentuser.id).subscribe(
        (response: Offre[]) => {
          this.offres = response;
        

          for(let offre of this.offres ){
            if(offre.stateoffer=="finished"){
            this.httpClient.get('http://localhost:8889/auctions/findWinner/' + offre.id)
            .subscribe(
              res => {
                this.postResponse = res;
                offre.pricewinner = this.postResponse.price;
                this.httpClient.get('http://localhost:8888/api/v1/registration/getUser/' + this.postResponse.iduser)
                .subscribe(
                  res1 => {
                    this.postResponse1 = res1;
                    offre.userwinner=this.postResponse1.firstName+" "+this.postResponse1.lastName;
                  }
                )
                
              }
            );
            
          }
        }
         
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

  
  ngOnInit(): void {
    this.getCurrentUser();
    
   
  }

}
