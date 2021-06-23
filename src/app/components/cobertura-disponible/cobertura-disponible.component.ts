import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cobertura } from 'src/app/models/Coberturas';
import { CoberturasService } from 'src/app/services/Coberturas/coberturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cobertura-disponible',
  templateUrl: './cobertura-disponible.component.html',
  styleUrls: ['./cobertura-disponible.component.css']
})
export class CoberturaDisponibleComponent implements OnInit {

  coberturas:Cobertura []  = [];
  
  coberturasSeleccionada: Cobertura;



  constructor(private coberturaService:CoberturasService,private route :Router ) { 
   
   
      this.getCobertura();
  }

  ngOnInit(): void {
  }
/**
 * 
 * Funcion traer coberturas y setear variable
 * 
 */
  getCobertura():void {
    this.coberturaService.getCoberturas().subscribe(res =>{
      
      if(res.length > 0){
        this.coberturas = res;
        this.coberturas = this.ordenarCoberturas(this.coberturas);
      }else{
        Swal.fire('error','Error al cargar coberturas','error');
      }
    },(error => Swal.fire('',error,'error') ))
  }
/***
 * 
 * Funcion para ordenar cobertura
 * 
 * 
 */
  ordenarCoberturas( ordenarPuntaje: Cobertura[] ): Cobertura[] {
    ordenarPuntaje.sort((a, b) => {
      if (a.puntaje > b.puntaje) return  1;
      if (a.puntaje < b.puntaje) return -1;
      return 0;
    })
    return ordenarPuntaje;
  }
  /**
   * 
   * envia
   * 
   * 
   */
  enviarCobertura(cobertura:Cobertura):void{

    this.coberturasSeleccionada = cobertura;
    this.guardarCobertura(this.coberturasSeleccionada);
     this.route.navigateByUrl('/resumen-datos');
  }

  /*
 * 
 * @param cobertura 
 * Guarda coberturas en el storage.
 */
  guardarCobertura(cobertura):void{

    this.coberturaService.guardarStorageCobertura(cobertura);
  }
/**
 * 
 *  Funcion ir Atras
 * 
 */
  goBack():void{
    this.route.navigateByUrl('/datos-vehiculos');

  }

}
