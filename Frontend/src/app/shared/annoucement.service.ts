import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Annoucement } from './annoucement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnoucementService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postAnnoucement(annoucement: Annoucement){
    return this.http.post(environment.apiBaseUrl+'/newannoucement',annoucement);
  }

  getAllAnnoucement(){
    return this.http.get(environment.apiBaseUrl+'/getallannoucement');
  }

  deleteAnnoucement(id){
    return this.http.delete(environment.apiBaseUrl+'/deleteannoucement/'+id);
  }
}
