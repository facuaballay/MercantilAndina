import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { CoberturaDisponibleComponent } from './components/cobertura-disponible/cobertura-disponible.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { DatosVehiculosComponent } from './components/datos-vehiculos/datos-vehiculos.component';
import { COBERTURAS, PERSONALES, VEHICULOS } from './constants/routeConstants';
// import { CargarNextForm } from './guards/cargarNextForm.guard';


const routes: Routes = [
  { path: PERSONALES, component: DatosPersonalesComponent,  },
  { path: VEHICULOS, component: DatosVehiculosComponent,  },
  { path: COBERTURAS, component: CoberturaDisponibleComponent, },
  { path: "", redirectTo: PERSONALES, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasModule { }


// canActivate: [CargarNextForm] 