import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WinnerauctionService {
  private apiServerURL=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getAuctionWinner(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/winnerAuction/getByuser/${id}`)
  }
  public accepterOffre(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/winnerAuction/accepter/${id}`)
  }
  public refuserOffre(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/winnerAuction/refuser/${id}`)
  }
  public getAuctionVendu(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerURL}/winnerAuction/sellerwinauction/${id}`)
  }

}
