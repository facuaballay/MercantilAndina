import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, VirtualTimeScheduler} from 'rxjs';
import { Municipio } from 'src/app/interfaces/Municipios';
import { Persona, Ubicacion } from 'src/app/models/Personas';
import { GeograficoService } from 'src/app/services/DatosGeograficos/geografico.service';
import { DatosPersonalesService } from 'src/app/services/DatosPersonales/datos-personales.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  formUser: FormGroup;
  persona: Persona;

  date = new Date();

  provincias;
  idProvincias = [];
  municipios = [];

  datos;


  constructor(
    private datosGeograficos:GeograficoService,
    private datosPersonalesService: DatosPersonalesService,
    private route: Router,
    private formBuilder: FormBuilder) {

    this.crearFormUser();
    this.getProvincias();

    this.formUser.controls.Provincia.disable();
    this.formUser.controls.Ciudad.disable();
    this.formUser.controls.Domicilio.disable();

    this.modificarFormulario();


    
  }

  ngOnInit(): void {

    
  }




  crearFormUser(): void {
    this.formUser = this.formBuilder.group({
      DNI: new FormControl('', [Validators.required, Validators.pattern('([0-9])*')]),
      Apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      Nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),]),
      Email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
      Celular: new FormControl('', [Validators.pattern('(?:(?:00)?549?)?0?(?:11|[2368]\\d)(?:(?=\\d{0,2}15)\\d{2})??\\d{8}$')]),
      Telefono: new FormControl('', [Validators.pattern('([0-9])*')]),
      Provincia: new FormControl('', Validators.required),
      Ciudad: new FormControl('', Validators.required),
      Domicilio: new FormControl('', Validators.required),
      FechaNacimento: new FormControl('', Validators.required),
      Usuario: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S*')]),
      Password2: new FormControl('', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S*')]),
    });
  };


  /**
   *  
   *  Enviar 
   */

  enviarPersonales(): void {
    this.datosPersonalesService.checkUsers(this.formUser.value.Usuario).subscribe(res => {

      console.log(this.formUser);
      /**
      * TODO: POner el verdadero check
      */
      if (true) {
        
        this.crearUsuario()
        
        Swal.fire('', 'Usuario registrado', 'success')  
          
      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Complete el formulario',
        })

        /**
         * TODO: Mostrar error en swet alert
         */
      }
    });
  }

  async crearUsuario(): Promise<void> {
    const {
      DNI,
      Apellido,
      Nombre,
      Email,
      Celular,
      Telefono,
      Provincia,
      Ciudad,
      Domicilio,
      FechaNacimento,
      Usuario,
      Password,
      Password2
    } = this.formUser.value;

    if (Password !== Password2) {
      this.formUser.setErrors({ Password: 'Los password deben de ser iguales' })
      return;
    }

    const ubicacion: Ubicacion = new Ubicacion(Provincia, Ciudad, Domicilio);
    this.persona = new Persona(
      DNI,
      Apellido,
      Nombre,
      Email,
      Celular,
      Telefono,
      ubicacion,
      FechaNacimento,
      Usuario,
      Password
    );

  await this.guardarUsuarioStorage();
    this.goNext();
  }

  guardarUsuarioStorage(): void {
    this.datosPersonalesService.guardarStoragePersona(this.persona);
  }

  goNext():void{
    this.route.navigateByUrl('/datos-vehiculos');
  }

  

  getProvincias():void{

    this.datosGeograficos.getProvincias().subscribe(res => {
      
      this.provincias = res;

      this.formUser.controls.Provincia.enable();



    });
  }

  getMunicipio(provinciaNombre):void {

    this.datosGeograficos.getMunicipios(provinciaNombre).subscribe(res => {
      
      if(res.municipios.length > 0){
        this.municipios = res.municipios;
        this.formUser.controls.Ciudad.enable();
        this.formUser.controls.Domicilio.enable();
      }
    
    });    
  }

  modificarFormulario(){

    
    if(localStorage.getItem('Persona').length > 0){

      this.formUser.controls.Ciudad.enable();
      this.formUser.controls.Domicilio.enable();

      this.datos =JSON.parse(localStorage.getItem('Persona'));


     this.formUser.controls.DNI.setValue(this.datos.DNI); 
     this.formUser.controls.Apellido.setValue(this.datos.Apellido); 
     this.formUser.controls.Nombre.setValue(this.datos.Nombre); 
     this.formUser.controls.Email.setValue(this.datos.Email); 
     this.formUser.controls.Celular.setValue(this.datos.Celular); 
     this.formUser.controls.Telefono.setValue(this.datos.Telefono); 
     this.formUser.controls.FechaNacimento.setValue(this.datos.FechaNacimiento); 
     this.formUser.controls.Usuario.setValue(this.datos.Usuario); 
     this.formUser.controls.Password.setValue(this.datos.Password);
      
     this.formUser.controls.Provincia.setValue(this.datos.Ubicacion.Provincia);  
     this.formUser.controls.Ciudad.setValue(this.datos.Ubicacion.Ciudad);  
     this.formUser.controls.Domicilio.setValue(this.datos.Ubicacion.Domicilio);  

    }



  }




  
}
