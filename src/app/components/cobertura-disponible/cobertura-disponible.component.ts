import { Component, OnInit } from '@angular/core';
import { CoberturasService } from 'src/app/services/Coberturas/coberturas.service';

@Component({
  selector: 'app-cobertura-disponible',
  templateUrl: './cobertura-disponible.component.html',
  styleUrls: ['./cobertura-disponible.component.css']
})
export class CoberturaDisponibleComponent implements OnInit {

  constructor(coberturaService:CoberturasService) { 

  }

  ngOnInit(): void {
  }

}
