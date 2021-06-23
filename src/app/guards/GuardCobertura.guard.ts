import { Injectable } from '@angular/core';
import {  CanActivate,  Router } from '@angular/router';
import Swal from 'sweetalert2';
import { COBERTURAS } from '../constants/routeConstants';

@Injectable({
  providedIn: 'root'
})
export class GuardCobertura implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {

  

        
        if(this.router.config[2].path === COBERTURAS){
          if (!localStorage.getItem('Vehiculo') ) {
            Swal.fire('','No Rellenaste vehiculo','error')
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true; 
          }
        }  
    }
}
