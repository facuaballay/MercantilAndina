import { Injectable } from '@angular/core';
import {  CanActivate,  Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RESUMEN } from '../constants/routeConstants';

@Injectable({
  providedIn: 'root'
})
export class GuardResumen implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {

  

        
        if(this.router.config[3].path === RESUMEN){
          if (!localStorage.getItem('Vehiculo') ) {
            Swal.fire('','No Seleccionaste Cobertura','error')
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true; 
          }
        }  
    }
}
