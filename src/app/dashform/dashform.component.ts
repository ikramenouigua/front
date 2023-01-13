import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  selector: 'app-dashform',
  templateUrl: './dashform.component.html',
  styleUrls: ['./dashform.component.css']
})
export class DashformComponent implements OnInit {

  @ViewChild('myForm') form!: NgForm;
  @ViewChild('myDialog', { static: true }) dialog:any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  public errors!: string [];
  private t: any;
  public addedUser : User = new User();
  public addedLogin : Login = new Login();
  public addedOffer : Offre = new Offre();
  parentSelector: boolean = false;
  public currentuser : Appuser = new Appuser();
  public users : Array<User> = [];

  selectedFile: File;
  retrievedImage: any;
  message: string;

  constructor(private registrationService: RegistrationService,private offerService: OffresService,
    private sharedService : SharedServiceService, private router : Router,private httpClient: HttpClient) { }

  async ngOnInit(){
    await this.getCurrentUser();
    
  }

  

 saveOffer(offer : Offre) {
  this.errors = [];
  this.offerService.addOffer(offer)
    .subscribe(data => {
        var win_timer = setInterval(function() {

          //window.location.reload();
          clearInterval(win_timer);
          
        }, 100); this.t;
      },
      error => {
        this.errors = error.error.errors;
      });
}

public onFileChanged(event) {
  //Select File
  this.selectedFile = event.target.files[0];
}

onUpload() {
  console.log(this.selectedFile);
  
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const imageFormData = new FormData();
    imageFormData.append('image',  this.selectedFile, this.selectedFile.name);
 
  
  const offer_id=15;

  // this.image.productImage=productImage;
  // this.image.productImage

  // Make a call to the Spring Boot Application to save the image
  this.httpClient.post('http://localhost:8889/images/upload/image',imageFormData , { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
      this.getCurrentUser()
      console.log(this.currentuser)
    }
    );
    console.log(this.selectedFile.name);
}
public async getCurrentUser(): Promise<void> {
  this.registrationService.getUser().subscribe(
   (response: Appuser) => {
     this.currentuser = response;
     this.getUsers()
   },
   (error: HttpErrorResponse) => {
     alert(error.message);
   }
 );
}
public getUsers(): void {
  this.registrationService.getUsers().subscribe(
    (response: User[]) => {
      this.users = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  
}
onSubmit(){
  this.addedOffer.title=this.form.value.offerDetails.title;
  this.addedOffer.address=this.form.value.offerDetails.address;
  this.addedOffer.debutAuction=this.form.value.offerDetails.debutAuction;
  this.addedOffer.initialprice=this.form.value.offerDetails.initialprice;
  this.addedOffer.duration=this.form.value.offerDetails.duration;
  this.addedOffer.description=this.form.value.offerDetails.description;
  this.addedOffer.imagename=this.selectedFile.name;
  this.addedOffer.iduser=this.currentuser.id;
  this.addedOffer.surface=this.form.value.offerDetails.surface;
  this.addedOffer.nbChambre=this.form.value.offerDetails.nbChambre;
   console.log("saaam"+this.addedOffer.imagename)
  console.log(this.addedOffer);
  console.log(this.form.value.offerDetails);
  this.saveOffer(this.addedOffer);
  //alert("votre compte est bien enregistré");

 //window.location.reload();

}

}
