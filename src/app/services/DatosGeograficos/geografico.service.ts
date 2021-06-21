import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { pluck} from 'rxjs/operators';
import { Municipios } from 'src/app/interfaces/Municipios';
import { Observable } from 'rxjs';
import { Provincia } from 'src/app/interfaces/Provincias';

@Injectable({
  providedIn: 'root'
})
export class GeograficoService {

  private Url : string = `${environment.baseUrlGeoRefAr}`;
  
  constructor(private http:HttpClient) { 

  }


  getProvincias(): Observable<Provincia[]> {
    return this.http.get(`${this.Url}/provincias`).pipe(pluck('provincias'));
  }

  getMunicipios(provinciaNombre:string): Observable<Municipios>{
    return this.http.get<Municipios>(`${this.Url}/municipios?provincia=${provinciaNombre}&campos=id,nombre&max=135`);
    
  }


}
