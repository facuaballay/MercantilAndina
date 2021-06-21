export class Persona {

    public DNI: number;
    public Apellido: string;
    public Nombre: string;
    public Email: string;
    public Celular: number;
    public Telefono: number;
    public Ubicacion: Ubicacion;//provincia/ciudad/domicilio
    public FechaNacimento: string;
    public Usuario: string;
    public Password: string;

    constructor(
        DNI: number,
        Apellido: string,
        Nombre: string,
        Email: string,
        Celular: number,
        Telefono: number,
        Ubicacion: Ubicacion,
        FechaNacimento: string,
        Usuario: string,
        Password: string,
    ) {
        this.DNI = DNI;
        this.Apellido = Apellido;
        this.Nombre = Nombre;
        this.Email = Email;
        this.Celular = Celular;
        this.Telefono = Telefono;
        this.Ubicacion = Ubicacion;
        this.FechaNacimento = FechaNacimento;
        this.Usuario = Usuario;
        this.Password = Password;
    }


}

export class Ubicacion {

    public Provincia: string;
    public Ciudad: string;
    public Domicilio: string;

    constructor(Provincia: string, Ciudad: string, Domicilio: string){
        this.Provincia = Provincia;
        this.Ciudad = Ciudad;
        this.Domicilio = Domicilio;
    }
}