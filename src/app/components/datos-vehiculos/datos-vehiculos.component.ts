import { Component, Input, OnInit, Version } from '@angular/core';
import { Router } from '@angular/router';
import { DatosVehiculosService } from 'src/app/services/DatosVehiculos/datos-vehiculos.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Marcas } from 'src/app/interfaces/Marcas';
import { Modelo } from 'src/app/interfaces/Modelo';


@Component({
  selector: 'app-datos-vehiculos',
  templateUrl: './datos-vehiculos.component.html',
  styleUrls: ['./datos-vehiculos.component.css']
})
export class DatosVehiculosComponent implements OnInit {

  formCar: FormGroup;
  
  marcas;
  modelos;
  versiones;
  anios: number[] = [];


  

  anioSeleccionado:number;
  marcaSeleccionada:Marcas;
  modeloSeleccionado;


  constructor(
    private route:Router,
    private datosVehiculosService:DatosVehiculosService,
    private formBuilder:FormBuilder,
    ) {

      this.crearFormVehicles();
      this.cargarMarcas();
      
      //Desactivar input
      this.formCar.get('marca').disable();
      this.formCar.get('anio').disable();
      this.formCar.get('modelo').disable();
      this.formCar.get('version').disable(); 

     

     }


  ngOnInit(): void {
  }

  enviarVehiculos(){


    this.goBack();
    this.goNext();

  }
/**
 * 
 * Crea formulario vehiculo
 */
  
  crearFormVehicles(): void {
    this.formCar = this.formBuilder.group({
      marca: new FormControl('',Validators.required),
      anio: new FormControl('', Validators.required),
      modelo: new FormControl('',Validators.required),
      version: new FormControl('',Validators.required),
    });
  };



  
  goBack():void{

    console.log('atras')

     this.route.navigateByUrl('/datos-personales');
    
  }
  goNext():void{
    this.route.navigateByUrl('/datos-coberturas');
    console.log('adelante')

  }

  ///marcas
  cargarMarcas(){

    this.datosVehiculosService.getMarcas().subscribe(res =>{
      
        if(res.length >  0){

          this.marcas = res;
          this.formCar.get('marca').enable();
          
          console.log(this.marcas);

        // me suscribo a los cambios de marca
          this.formCar.controls.marca.valueChanges.subscribe(resmarca =>{
            
            this.marcaSeleccionada = resmarca;
            console.log(this.marcaSeleccionada)
            // si esta seleccionada la marca habilita años  
            if(this.formCar.controls.marca.value.length > 0){
   
              this.cargarAnio();
              this.formCar.get('anio').enable();
            }
          });

        }else{
          Swal.fire({
            icon: 'error',
            text: 'Error en cargar marca!',
          })
        }  



    });
  }
/**
 * 
 *  Cargar años
 * 
 */
  cargarAnio(){
    const anioActual = new Date().getFullYear();

    for(let i = 1; i <= 20 ; i++ ){
      
      this.anios.push(anioActual - i);

    }
    // me suscribo a los cambios del input
   this.formCar.controls.anio.valueChanges.subscribe( res => {

    if(this.formCar.controls.anio.value > 0){

      this.cargarModelos();
      this.formCar.get('modelo').enable();
      
    }
     this.anioSeleccionado = res;
   })


  }
 /**
  * 
  *   Cargar modeloes
  * 
  */
  cargarModelos(){

    // this.marcaSeleccionada = this.marcas.find(marca => marca.codigo );

   this.datosVehiculosService.getModelos( this.marcaSeleccionada.codigo,this.anioSeleccionado).subscribe(res =>{
     
      this.modelos = res;
  
    
   },(error => {

    Swal.fire({
      icon: 'error',
      text: 'No existen modelos de ese año!',
    });

    }));

    this.formCar.controls.modelo.valueChanges.subscribe(res =>{


      console.log(res,'ssda');
      if(this.formCar.controls.modelo.value.length > 0  ){
       
        this.cargarVersion();
        this.formCar.get('version').enable(); 

      } 


    })
  
  }
  /**
   * 
   * Cargar version
   * 
   */
  cargarVersion(){

    this.modeloSeleccionado = this.modelos;

    console.log(this.modeloSeleccionado,'sss');
      // this.datosVehiculosService
      // .getVersiones(this.marcaSeleccionada.codigo,
      //   this.anioSeleccionado,this.modeloSeleccionado
      //   ).subscribe( res =>{


      //     console.log(res,'versip');

      //   })

  }



}
