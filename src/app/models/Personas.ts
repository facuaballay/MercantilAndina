export class Persona{

    public DNI:number;
    public Apellido:string;
    public Nombre:string;
    public Email:string;
    public Celular:number;
    public Telefono:number;
    public Ubicacion:Ubicacion;//provincia/ciudad/domicilio
    public FechaNacimento:string;
    public Usuario:string;
    public Password:string;

    

    constructor(){

    }


}

export interface Ubicacion{

         provincia : string;
         ciudad : string;
         domicilio:string;


}