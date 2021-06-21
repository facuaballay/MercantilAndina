import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Persona } from 'src/app/models/Personas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

  private Url: string = `${environment.baseUrl}/api_mock_frontend/v1`;

  constructor(private http: HttpClient) {

  }
  /**
   * comprueba usuarios disponibles.
   * @param usuario: string
   */
  checkUsers(usuario: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.Url}/usuarios/?nombre=${usuario}`);
  }

  guardarStoragePersona(persona: Persona): void {
    localStorage.setItem('Persona', JSON.stringify(persona));
  }

}
