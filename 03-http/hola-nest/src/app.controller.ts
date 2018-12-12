import {Get, Controller, Request, Response,Headers, HttpCode, HttpException, Query, Param} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";

// http://192.168.1.2:3000/Usuario/saludar     METODO -> GET
// http://192.168.1.2:3000/Usuario/salir   METODO -> POST
// http://192.168.1.2:3000/Usuario/registrar METODO -> PUT
// http://192.168.1.2:3000/Usuario/borrar METODO -> DELETE
// http://192.168.1.2:3000/Notas


// Decorador -> FUNCION
// SE EJECUTA ANTES DE ALGO
@Controller('Usuario') // Decoradores!
export class AppController {

    @Get('saludar')
    saludar(
        @Query() queryParams,
        @Query('nombre') nombre,
        @Headers('seguridad') seguridad,
    ): string { // metodo!
        return nombre;
    }

    // /Usuario/segmentoUno/12/segmentoDos
    @Get('segmentoUno/:idUsuario/segmentoDos')
    ruta(
        @Param() todosParametrosRuta,
        @Param('idUsuario') idUsuario,
    ): string { // metodo!
        return idUsuario;
    }










    @Get('despedirse')
    @HttpCode(201)
    despedirse(): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {

                throw new HttpException({
                        mensaje: 'Error en despedirse',
                    },
                    400);
            }
        );
    }

    @Get('tomar')
    @HttpCode(201)
    tomar(): string { // metodo!
        return 'Estoy borracho';
    }

    @Get('saludarObservable')
    saludarObservable(): Observable<string> { // metodo!
        return of('Hola mundo');
    }





}