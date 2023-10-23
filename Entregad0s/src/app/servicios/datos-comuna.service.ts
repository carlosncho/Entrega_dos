import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosComunaService {
  private apiUrl= 'https://dev.matiivilla.cl/duoc/location/comuna';

  constructor(private http: HttpClient) {}
    
    obtenerComunas():Observable<any>{
      return this.http.get<any>(this.apiUrl)
    }
   
}
