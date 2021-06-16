//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RutasModule } from './Routes';
import { HttpClientModule } from "@angular/common/http";

//componentes
import { AppComponent } from './app.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DatosVehiculosComponent } from './components/datos-vehiculos/datos-vehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosPersonalesComponent,
    NavbarComponent,
    DatosVehiculosComponent,
    DatosPersonalesComponent
  ],
  imports: [
   BrowserModule,
   RutasModule,
   HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
