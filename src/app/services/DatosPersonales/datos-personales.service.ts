import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

 private Url : string = `${environment.baseUrl}/api_mock_frontend/v1`;

  constructor(private http:HttpClient) { 


    
       this.http.get(`${ this.Url }/usuarios?nombre=usuario`).subscribe(res => console.log(res));

       
    
  }
}
