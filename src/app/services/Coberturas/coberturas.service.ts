import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cobertura } from 'src/app/models/Coberturas';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoberturasService {

  constructor(private http: HttpClient) {

  }
 /**
  * 
  * getCoberturas()
  * Obtiene datos de la api.
  * 
  */
  getCoberturas(): Observable<Cobertura[]>{

  
    return this.http.get<Cobertura[]>(`${environment.baseUrl}/api_mock_frontend/v1/coberturas`);
  }
  /**
   * 
   * guardarStorageCobertura(params)
   * @param cobertura 
   * Guarda cobertura en localstorage
   * 
   */
  guardarStorageCobertura(cobertura:Cobertura):void{

    localStorage.setItem('Cobertura',JSON.stringify(cobertura));
  }

}
