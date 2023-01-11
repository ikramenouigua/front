import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auction } from '../model/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiServerURL=environment.apiBaseUrl;


  constructor(private http:HttpClient) { }
  public getAuctions():Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/auctions/allAuctions`)
  }

  public addAuction(bid: Auction): Observable<Auction> {
    return this.http.post<Auction>(`${this.apiServerURL}/auctions/add`, bid);
  }

  getAuctionById(bidId: number) : Observable<Auction> {
    return this.http.get<Auction>(`${this.apiServerURL}/auctions/find/${bidId}`);
  }
  getAuctionByofferId(offerId: number) : Observable<any> {
    console.log("jhnhhhhhhhhhhhhhhhhhhh")
    return this.http.get<any>(`${this.apiServerURL}/auctions/findbyoffer/${offerId}`);
  }
}
