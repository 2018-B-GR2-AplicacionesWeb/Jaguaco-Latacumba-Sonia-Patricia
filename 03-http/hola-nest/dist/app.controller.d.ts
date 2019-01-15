import { Observable } from "rxjs";
export declare class AppController {
    saludar(queryParams: any, nombre: any, seguridad: any): string;
    ruta(todosParametrosRuta: any, idUsuario: any): string;
    despedirse(): Promise<string>;
    tomar(): string;
    saludarObservable(): Observable<string>;
}
