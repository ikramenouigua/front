import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offre } from '../model/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  private apiServerURL=environment.apiBaseUrl;


  constructor(private http:HttpClient) { }
  public getOffers():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/offers/allOffers`)
  }

  public addOffer(offer: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiServerURL}/offers/add`, offer);
  }

  getofferById(offerId: number) : Observable<Offre> {
    return this.http.get<Offre>(`${this.apiServerURL}/offers//find/${offerId}`);
  }
  getofferByIdUser(iduser: number) : Observable<any> {
    return this.http.get<any>(`${this.apiServerURL}/offers/getOffersByUser/${iduser}`);
  }

}
