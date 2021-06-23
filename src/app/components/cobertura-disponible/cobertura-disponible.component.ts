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
   * getCobertura()
   * trae coberturas desde la api
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
  /**
   * ordenarCoberturas( param )
   * @param ordenarPuntaje 
   * Ordena las coberturas por puntaje
   * @returns 
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
  * enviarCobertura(cobertura)
  * @param cobertura 
  * guarda cobertura en el storage y envia a la siguiente pagina
  * 
  */
  enviarCobertura(cobertura:Cobertura):void{

    this.coberturasSeleccionada = cobertura;
    this.guardarCobertura(this.coberturasSeleccionada);
     this.route.navigateByUrl('/resumen-datos');
  }

  /*
  * guardarCobertura(param)
  * @param cobertura 
  * Guarda coberturas en el storage.
  */
  guardarCobertura(cobertura):void{

    this.coberturaService.guardarStorageCobertura(cobertura);
  }
  /**
   * 
   *  goBack()
   *  va a la pagina de Atras
   * 
   * 
   */
  goBack():void{
    this.route.navigateByUrl('/datos-vehiculos');

  }

}
