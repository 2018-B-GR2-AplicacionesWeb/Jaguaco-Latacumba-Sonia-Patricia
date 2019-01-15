export declare class UsuarioService {
    usuarios: Usuario[];
    registroActual: number;
    crear(nuevoUsuario: Usuario): Usuario;
    actualizar(idUsuario: number, nuevoUsuario: Usuario): Usuario;
    borrar(idUsuario: number): Usuario;
    buscarPorId(idUsuario: number): Usuario;
    buscarPorNombreOBiografia(busqueda: string): Usuario[];
}
export interface Usuario {
    id: number;
    nombre: string;
    biografia: string;
}
