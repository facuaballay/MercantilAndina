import { Component, Input, OnInit, Version } from '@angular/core';
import { Router } from '@angular/router';
import { DatosVehiculosService } from 'src/app/services/DatosVehiculos/datos-vehiculos.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Marcas } from 'src/app/interfaces/Marcas';
import { Vehiculos } from 'src/app/models/Vehiculos';
import { Modelo } from 'src/app/interfaces/Modelo';


@Component({
  selector: 'app-datos-vehiculos',
  templateUrl: './datos-vehiculos.component.html',
  styleUrls: ['./datos-vehiculos.component.css']
})
export class DatosVehiculosComponent implements OnInit {

  formCar: FormGroup;
  vehiculo:Vehiculos;
  
  marcas:Marcas[] = [];
  modelos:Modelo;
  versiones:Version;
  anios: number[] = [];
  datos;  

  anioSeleccionado:number;
  marcaSeleccionada:Marcas;
  modeloSeleccionado:string;


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
/**
 * 
 *  funcion Enviar vehiculos 
 *
 */
  enviarVehiculos(){

    this.goBack();

    if(this.formCar.valid){

      Swal.fire('Auto Registrado','','success');

      this.goNext();
    }else{
      Swal.fire('','Rellene los campos','error');
      this.route.navigateByUrl('/datos-vehiculos');
    }
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
/**
 * 
 * 
 *  ir atras funcion
 * 
 */
  
  goBack():void{

     this.route.navigateByUrl('/datos-personales');

  }
  /**
   * 
   * ir adelante y guardar vehiculos en el storage
   * 
   */
  goNext():void{
    const {
      marca,
      anio,
      modelo,
      version,
    } = this.formCar.value;

    this.vehiculo = new Vehiculos(
      marca,
      anio,
      modelo,
      version
      );

    this.guardaVehiculosStorage();

    this.route.navigateByUrl('/datos-coberturas');

  }

  /***
   * traigo servicio y marcas
   * 
   * 
   */
  cargarMarcas():void{

    this.datosVehiculosService.getMarcas().subscribe(res =>{
      
        if(res.length >  0){

          this.marcas = res;
          this.formCar.get('marca').enable();
          

        // me suscribo a los cambios de marca
          this.formCar.controls.marca.valueChanges.subscribe(resmarca =>{
            
            this.marcaSeleccionada = resmarca;
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



    },error => Swal.fire('Error',error,'error'));
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

     this.anioSeleccionado = res;
      
      this.formCar.get('modelo').enable();

      this.cargarModelos(this.marcaSeleccionada)
    }
   },error => Swal.fire('Error',error,'error'))


  }
 /**
  * 
  *   Cargar modeloes
  * 
  */
  cargarModelos(marcaNombre){

    this.marcaSeleccionada = this.marcas.find(marca => marca.desc === marcaNombre);



    
    this.datosVehiculosService.getModelos(this.marcaSeleccionada.codigo,this.anioSeleccionado).subscribe(res =>{
     
      this.modelos = res;
  
    
   },(error => {
    Swal.fire({
      icon: 'error',
      text: 'No existen modelos de ese año!',
    });

    }));

    this.formCar.controls.modelo.valueChanges.subscribe(res =>{


      this.modeloSeleccionado = res;

      if(this.formCar.controls.modelo.value.length > 0  ){
        
        this.cargarVersion();
        this.formCar.get('version').enable(); 

        } 
    });
  }
  /**
   * 
   * Cargar version
   * 
   */
  cargarVersion(){


  this.datosVehiculosService.getVersiones(this.marcaSeleccionada.codigo,this.anioSeleccionado,this.modeloSeleccionado).subscribe(res =>{
    
    this.versiones = res;
    
    },error => Swal.fire('Error','Error al cargar versiones','error'))
      

  }
  /**
   * 
   * guardar vehiculos en el storage
   * 
   */
  
  guardaVehiculosStorage(){
    
    this.datosVehiculosService.guardarVehiculosStorage(this.vehiculo);
  }


}
