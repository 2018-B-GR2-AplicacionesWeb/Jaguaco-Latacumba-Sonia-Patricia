import { Usuario, UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private readonly _usuarioService;
    constructor(_usuarioService: UsuarioService);
    inicio(response: any, accion: string, nombre: string, busqueda: string): void;
    borrar(idUsuario: string, response: any): void;
    crearUsuario(response: any): void;
    actualizarUsuario(idUsuario: string, response: any): void;
    actualizarUsuarioFormulario(idUsuario: string, response: any, usuario: Usuario): void;
    crearUsuarioFormulario(usuario: Usuario, response: any): void;
}
