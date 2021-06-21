import { Component } from '@angular/core';
import { DatosVehiculosService } from './services/DatosVehiculos/datos-vehiculos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MercantilAndina';


  constructor(marcasService:DatosVehiculosService){

   
   
  }

}
