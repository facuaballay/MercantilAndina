import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/interfaces/Municipios';
import { Provincia } from 'src/app/interfaces/Provincias';
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
  date = new Date().getFullYear();

  edadMinima = this.date - 18;
  edadMaxima = this.date - 99; 

  provincias:Provincia[] = [];
  idProvincias = [];
  municipios:Municipio[] = [];

  datos:Persona;


  constructor(
    private datosGeograficos:GeograficoService,
    private datosPersonalesService: DatosPersonalesService,
    private route: Router,
    private formBuilder: FormBuilder) {

    this.crearFormUser();
    this.getProvincias();

    //desabilito los formularios.
    this.formUser.controls.Provincia.disable();
    this.formUser.controls.Ciudad.disable();
    this.formUser.controls.Domicilio.disable();

    
  }



  ngOnInit(): void {

    this.modificarFormulario(); 
    
  }

  

/**
 * crearFormUser():
 * Crea el formulario reactivo
 * 
 */
  crearFormUser(): void {
    this.formUser = this.formBuilder.group({
      DNI: new FormControl('', [Validators.required, Validators.pattern('([0-9])*'),Validators.minLength(7), Validators.maxLength(8)]),
      Apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.minLength(2), Validators.maxLength(15)]),
      Nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.minLength(2), Validators.maxLength(15)]),
      Email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),Validators.email]),
      Celular: new FormControl('', [Validators.pattern('(?:(?:00)?549?)?0?(?:11|[2368]\\d)(?:(?=\\d{0,2}15)\\d{2})??\\d{8}$')]),
      Telefono: new FormControl('', [Validators.pattern('([0-9])*')]),
      Provincia: new FormControl('', Validators.required),
      Ciudad: new FormControl('', Validators.required),
      Domicilio: new FormControl('', Validators.required),
      FechaNacimento: new FormControl('', [Validators.required,Validators.max(this.edadMinima),Validators.min(this.edadMaxima)]),
      Usuario: new FormControl('',[ Validators.required,Validators.minLength(3), Validators.maxLength(30)]),
      Password: new FormControl('', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S*')]),
      Password2: new FormControl('', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S*')]),
    });
  };


  /**
   *  enviarPersonales():
   *  Comprueba si el usuario existe o no.
   */

  enviarPersonales(): void {
    this.datosPersonalesService.checkUsers(this.formUser.value.Usuario).subscribe(res => {
      if (this.formUser.valid) {       
        
        this.crearUsuario();      
       
        Swal.fire('', 'Usuario registrado', 'success')
        
        this.goNext();  
        
      } else {
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Complete el formulario',
        })
      }
    });
  }
  /**
   * CrearUsuario();
   * @returns 
   * crea las constantes de usuarios
   */
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
      this.formUser.get('Password2').touched;
      Swal.fire('error','las contraseñas deben coincidir','error')
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
  /**
   * guardarUsuarioStorage():
   * 
   * guarda los datos del formulario en el localstorage
   */
  guardarUsuarioStorage(): void {
    this.datosPersonalesService.guardarStoragePersona(this.persona);
  }
  /**
   * goNext()
   * redirige a la siguiente pagina.
   */
  goNext():void{
    this.route.navigateByUrl('/datos-vehiculos');
   
  }

  
  /**
   * getProvincias();
   * Carga las provincias desde la api
   * 
   */
  getProvincias():void{

    this.datosGeograficos.getProvincias().subscribe(res => {
      
      this.provincias = res;

      this.formUser.controls.Provincia.enable();



    },error => Swal.fire('Error','Error al cargar provincias','error'));
  }
  /**
   * 
   * getMunicipio(param)
   * 
   * @param provinciaNombre 
   * 
   * Carga los municipios desde la api
   *
   */
  getMunicipio(provinciaNombre):void {

    this.datosGeograficos.getMunicipios(provinciaNombre).subscribe(res => {
      
      if(res.municipios.length > 0){
        this.municipios = res.municipios;
        this.formUser.controls.Ciudad.enable();
        this.formUser.controls.Domicilio.enable();
      }
    
    },error => Swal.fire('Error','Error al cargar municipios','error'));    
  }
 
  /**
   * 
   * @param campos 
   * Validacion reactiva formulario.
   * @returns 
   */
   validarForm(campos){
     
    return this.formUser.get(campos).invalid && this.formUser.get(campos).touched;
  }


  /**
   * 
   * modificarFormulario()
   * Rellena formulario con datos del localstorage.
   * 
   */
  modificarFormulario(){
    try {
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
    } catch (error) {
        
    }
  }
  
  
}
