import { Injectable } from '@angular/core';
import {  CanActivate,  Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  VEHICULOS } from '../constants/routeConstants';

@Injectable({
  providedIn: 'root'
})
export class GuardVehiculo implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {

  


        if(this.router.config[1].path === VEHICULOS ){
         
          if (!localStorage.getItem('Persona')) {
              Swal.fire('','No Rellenaste Usuario','error')
              this.router.navigate(['/']);
              return false;
          }else{
              return true;
          }
        }
        
  
  }
}
