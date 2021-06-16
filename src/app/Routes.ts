import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { CoberturaDisponibleComponent } from './components/cobertura-disponible/cobertura-disponible.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { DatosVehiculosComponent } from './components/datos-vehiculos/datos-vehiculos.component';


const routes: Routes = [

  {path:'Datospersonales',component:DatosPersonalesComponent},
  {path:'Datosvehiculos',component:DatosVehiculosComponent},
  {path:'Coberturas',component:CoberturaDisponibleComponent},
  {path: "", redirectTo: "/Datospersonales", pathMatch: "full" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasModule { }
