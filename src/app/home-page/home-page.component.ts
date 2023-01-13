import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appuser } from '../model/appuser.model';
import { Offre } from '../model/offre.model';
import { RegisterComponent } from '../register/register.component';
import { OffresService } from '../services/offres.service';
import { RegistrationService } from '../services/registration.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public offres : Array<Offre> = [];
  public logout : String=new String();
  receivedReceipt : Appuser;
  public currentuser : Appuser = new Appuser();
  public offreId:number = 3
  dbImage: any;
  postResponse: any;
  private data;  

  public surface_val;
  public nbChambre_val;

  form = new FormGroup({  
    surface : new FormControl(),  
    nbChambre : new FormControl()  
  });  

  constructor(private registrationService: RegistrationService, private sharedService : SharedServiceService,
    private offreService: OffresService ,private router : Router,private httpClient: HttpClient){}

async ngOnInit() : Promise<void>{
  this.getOffres();
  await this.getCurrentUser();
  this.receivedReceipt = this.sharedService.getMessage();
    console.log('receive : ',this.receivedReceipt.lastName);
}

getData(surface_val,nbChambre_val)  
  {  
      this.offreService.getData(surface_val,nbChambre_val).subscribe(  
        (response: Offre[]) => {
          this.offres = response;
        console.log(this.offres)
    
        for(let offre of this.offres ){
          this.httpClient.get('http://localhost:8889/images/get/image/info/' + offre.imagename)
          .subscribe(
            res => {
              this.postResponse = res;
              offre.imagename = 'data:image/jpeg;base64,' + this.postResponse.image;
            }
          );
          offre.imagename='data:image/jpeg;base64,' + offre.imagename;
          console.log("coco"+offre.imagename)
        }
    
          this.receivedReceipt = this.sharedService.getMessage();
        console.log('receive : ',this.receivedReceipt);
    
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }  
  
  searchForm(searchInfo)  
  {  
         
        this.surface_val=this.form.get('surface').value;
        this.nbChambre_val=this.form.get("nbChambre").value;
        this.getData(this.surface_val,this.nbChambre_val);  
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

public getOffres(): void {
  this.offreService.getOffers().subscribe(
    (response: Offre[]) => {
      this.offres = response;
    console.log(this.offres)

    for(let offre of this.offres ){
      this.httpClient.get('http://localhost:8889/images/get/image/info/' + offre.imagename)
      .subscribe(
        res => {
          this.postResponse = res;
          offre.imagename = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
      offre.imagename='data:image/jpeg;base64,' + offre.imagename;
      console.log("coco"+offre.imagename)
    }

      this.receivedReceipt = this.sharedService.getMessage();
    console.log('receive : ',this.receivedReceipt);

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
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
