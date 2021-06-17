import { Component, OnInit } from '@angular/core';
import { DatosPersonalesService } from 'src/app/services/DatosPersonales/datos-personales.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  constructor(datosPersonales:DatosPersonalesService) {

    
   }

  ngOnInit(): void {
  }

}
