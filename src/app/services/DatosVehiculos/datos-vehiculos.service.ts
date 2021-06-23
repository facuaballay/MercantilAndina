import { HttpClient } from '@angular/common/http';
import { Injectable, Version } from '@angular/core';
import { Observable } from 'rxjs';
import { Marcas } from 'src/app/interfaces/Marcas';
import { Modelo } from 'src/app/interfaces/Modelo';
import { Vehiculos } from 'src/app/models/Vehiculos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosVehiculosService {
  
  
  private Url: string = `${environment.baseUrl}/api/v1/vehiculos/marcas`;



  constructor(private http:HttpClient) { }

  
  /**
   * 
   * getMarcas()
   * @returns 
   * Obtiene marcas de la api.
   * 
   */
  getMarcas():Observable<Marcas[]>{

    return this.http.get<Marcas[]>(`${this.Url}`);

  }
  /**
   * 
   * getModelos(params)
   * @param code 
   * @param anio 
   * @returns 
   * Obtiene modelos de la api.
   * 
   */
  getModelos(code:number, anio:number):Observable<Modelo>{
    return this.http.get<Modelo>(`${ this.Url }/${ code }/${ anio }`);
  }
  /**
   * 
   * getVersiones(params);
   * @param code 
   * @param anio 
   * @param model 
   * @returns 
   * Obtiene versiones de la api.
   */

  getVersiones(code:number, anio:number, model:string):Observable<Version>{
    return this.http.get<Version>(`${ this.Url }/${ code }/${ anio }/${ model }`);
  }
  /**
   * 
   * guardarVehiculosStorage()
   * @param vehiculo 
   * guarda vehiculo en localstorage
   * 
   */
  guardarVehiculosStorage(vehiculo:Vehiculos):void{

    localStorage.setItem('Vehiculo',JSON.stringify(vehiculo));

  }


}
