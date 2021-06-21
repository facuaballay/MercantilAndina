// import { Location } from '@angular/common';
// import { Injectable } from '@angular/core';
// import { CanActivate, NavigationEnd, Router } from '@angular/router';
// import { COBERTURAS, PERSONALES, VEHICULOS } from '../constants/routeConstants';

// @Injectable({
//   providedIn: 'root'
// })
// export class CargarNextForm implements CanActivate {

//   constructor(private router: Router) { }
//   canPass: boolean = true;

//   canActivate() {
//     this.router.events.subscribe((e) => {
//       if (e instanceof NavigationEnd) {
//         console.log(e.url);
//         if (e.url === `/${VEHICULOS}`) {
//           console.log("en el subcriber",!!localStorage.getItem('Persona'))
//           return !!localStorage.getItem('Persona');
//         }
//       }
//     });
//     // switch (this.route.url) {
//     //   case PERSONALES:
//     //     return true;
//     //   case VEHICULOS:
//     //     console.log(JSON.parse(localStorage.getItem('Persona')));
//     //     return true;
//     //   case COBERTURAS:
//     //     return true;
//     //   default:
//     //     this.route.navigateByUrl(PERSONALES);
//     //     return false;
//     // }
//   }
// }
