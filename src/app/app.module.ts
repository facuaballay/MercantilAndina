//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RutasModule } from './Routes';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


//componentes
import { AppComponent } from './app.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CoberturaDisponibleComponent } from './components/cobertura-disponible/cobertura-disponible.component';
import { DatosVehiculosComponent } from './components/datos-vehiculos/datos-vehiculos.component';
import { ResumenDatosComponent } from './components/resumen-datos/resumen-datos.component';

//guard
import {  GuardVehiculo } from './guards/GuardVehiculo.guard';
import { GuardCobertura } from './guards/GuardCobertura.guard';


@NgModule({
  declarations: [
    AppComponent,
    DatosPersonalesComponent,
    NavbarComponent,
    DatosVehiculosComponent,
    CoberturaDisponibleComponent,
    ResumenDatosComponent
  ],
  imports: [
   BrowserModule,
   RutasModule,
   HttpClientModule,
   ReactiveFormsModule,
   CommonModule,
   SweetAlert2Module
    
  ],
  providers: [GuardCobertura,GuardVehiculo],
  bootstrap: [AppComponent]
})
export class AppModule { }
