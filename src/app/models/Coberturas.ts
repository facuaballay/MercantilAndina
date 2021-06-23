export class Cobertura {
    numero:         number;
    costo:          number;
    producto:       string;
    texto:          string;
    franquicia:     number;
    codigoProducto: number;
    titulo:         string;
    descripcion:    string;
    puntaje:        number;
    granizo:        boolean;


    constructor(

        numero:number,
        costo:number,
        producto:string,
        texto:string,
        franquicia:number,
        codigoProducto:number,
        titulo:string,
        descripcion:string,
        puntaje:number,
        granizo:boolean 

    ){
       this.numero = numero;
       this.costo = costo;
       this.producto = producto;
       this.texto = texto;
       this.franquicia = franquicia;
       this.codigoProducto = codigoProducto;
       this.titulo = titulo;
       this.descripcion = descripcion;
       this.puntaje = puntaje;
       this.granizo = granizo;

    }
}
