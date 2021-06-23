import { Version } from "@angular/core";
import { Marcas } from "../interfaces/Marcas";
import { Modelo } from "../interfaces/Modelo";

export class Vehiculos {



    Marca:Marcas;
    Anio:number;
    Modelo:Modelo;
    Version:Version;


    constructor (
        Marca:Marcas,
        Anio:number,
        Modelo:Modelo,
        Version:Version
    
    ) {

        this.Marca = Marca;
       this.Anio = Anio;
       this.Modelo = Modelo;
       this.Version = Version;

    }
    
    
    


}



