import { Component, OnInit } from '@angular/core';
import { CoberturasService } from 'src/app/services/Coberturas/coberturas.service';

@Component({
  selector: 'app-cobertura-disponible',
  templateUrl: './cobertura-disponible.component.html',
  styleUrls: ['./cobertura-disponible.component.css']
})
export class CoberturaDisponibleComponent implements OnInit {

  coberturas;

  constructor(private coberturaService:CoberturasService) { 
    this.getCobertura();
  }

  ngOnInit(): void {
  }

  getCobertura(){
    this.coberturaService.getCoberturas().subscribe(res =>{
      this.coberturas = res;
      console.log(this.coberturas);

      
    this.guardarCobertura(this.coberturas);

      
    })
  }


  

  enviar(){
    console.log('enviado');
  }

  guardarCobertura(cobertura){
    this.coberturaService.guardarStorageCobertura(cobertura);
  }

}
