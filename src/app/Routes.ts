import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { CoberturaDisponibleComponent } from './components/cobertura-disponible/cobertura-disponible.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { DatosVehiculosComponent } from './components/datos-vehiculos/datos-vehiculos.component';
import { ResumenDatosComponent } from './components/resumen-datos/resumen-datos.component';
import { COBERTURAS, PERSONALES, RESUMEN, VEHICULOS } from './constants/routeConstants';
//guard
import { GuardCobertura } from './guards/GuardCobertura.guard';
import { GuardResumen } from './guards/GuardResumen.guard';
import {  GuardVehiculo } from './guards/GuardVehiculo.guard';


const routes: Routes = [
  { path: PERSONALES, component: DatosPersonalesComponent,  },
  { path: VEHICULOS, component: DatosVehiculosComponent,canActivate: [GuardVehiculo]  },
  { path: COBERTURAS, component: CoberturaDisponibleComponent,canActivate: [GuardCobertura]  },
  { path: RESUMEN,component:ResumenDatosComponent , canActivate: [GuardResumen] },
  {path: '**', component: DatosPersonalesComponent},
  { path: "", redirectTo: PERSONALES, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasModule { }


