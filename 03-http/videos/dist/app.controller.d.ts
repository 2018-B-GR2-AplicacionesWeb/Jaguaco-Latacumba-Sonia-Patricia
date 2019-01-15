import { Observable } from "rxjs";
import { Usuario, UsuarioService } from "./usuario/usuario.service";
export declare class AppController {
    private readonly _usuarioService;
    constructor(_usuarioService: UsuarioService);
    saludar(queryParams: any, nombre: any, seguridad: any): string;
    ruta(todosParametrosRuta: any, idUsuario: any): string;
    despedirse(): Promise<string>;
    tomar(): string;
    saludarObservable(): Observable<string>;
    inicio(response: any, accion: string, nombre: string, busqueda: string): void;
    borrar(idUsuario: string, response: any): void;
    crearUsuario(response: any): void;
    actualizarUsuario(idUsuario: string, response: any): void;
    actualizarUsuarioFormulario(idUsuario: string, response: any, usuario: Usuario): void;
    crearUsuarioFormulario(usuario: Usuario, response: any): void;
}
