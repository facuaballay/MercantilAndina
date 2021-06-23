import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cobertura } from 'src/app/models/Coberturas';
import { Persona } from 'src/app/models/Personas';
import { Vehiculos } from 'src/app/models/Vehiculos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-datos',
  templateUrl: './resumen-datos.component.html',
  styleUrls: ['./resumen-datos.component.css']
})
export class ResumenDatosComponent implements OnInit {

  Persona:Persona;
  Vehiculo:Vehiculos;
  Cobertura:Cobertura;

  constructor(private route : Router) {

    this.Persona = JSON.parse(localStorage.getItem('Persona'));
    this.Vehiculo = JSON.parse(localStorage.getItem('Vehiculo'));
    this.Cobertura = JSON.parse(localStorage.getItem('Cobertura'));

   }

  ngOnInit(): void {
  }

  enviarFormularios():void{

    Swal.fire('','Enviado Correctamente!','success');
    localStorage.clear();
    this.route.navigate(['/datos-personales']);
  }

  goBack():void{
    this.route.navigateByUrl('/datos-coberturas');

  }

}
