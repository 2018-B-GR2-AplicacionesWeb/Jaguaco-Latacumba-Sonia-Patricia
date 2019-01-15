"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
// http://192.168.1.2:3000/Usuario/saludar     METODO -> GET
// http://192.168.1.2:3000/Usuario/salir   METODO -> POST
// http://192.168.1.2:3000/Usuario/registrar METODO -> PUT
// http://192.168.1.2:3000/Usuario/borrar METODO -> DELETE
// http://192.168.1.2:3000/Notas
// Decorador -> FUNCION
// SE EJECUTA ANTES DE ALGO
var AppController = /** @class */ (function () {
    // CONSTRUCTOR NO ES UN CONSTRUCTOR NORMAL!!!
    function AppController(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    AppController.prototype.saludar = function (queryParams, nombre, seguridad) {
        return nombre;
    };
    // /Usuario/segmentoUno/12/segmentoDos
    AppController.prototype.ruta = function (todosParametrosRuta, idUsuario) {
        return idUsuario;
    };
    AppController.prototype.despedirse = function () {
        return new Promise(function (resolve, reject) {
            throw new common_1.HttpException({
                mensaje: 'Error en despedirse',
            }, 400);
        });
    };
    AppController.prototype.tomar = function () {
        return 'Estoy borracho';
    };
    AppController.prototype.saludarObservable = function () {
        return rxjs_1.of('Hola mundo');
    };
    AppController.prototype.inicio = function (response, accion, nombre, busqueda) {
        var mensaje; // undefined
        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    mensaje = "Registro " + nombre + " actualizado";
                    break;
                case 'borrar':
                    mensaje = "Registro " + nombre + " eliminado";
                    break;
                case 'crear':
                    mensaje = "Registro " + nombre + " creado";
                    break;
            }
        }
        var usuarios;
        if (busqueda) {
            usuarios = this._usuarioService
                .buscarPorNombreOBiografia(busqueda);
        }
        else {
            usuarios = this._usuarioService.usuarios;
        }
        response.render('inicio', {
            nombre: 'Adrian',
            arreglo: usuarios,
            mensaje: mensaje
        });
    };
    AppController.prototype.borrar = function (idUsuario, response) {
        var usuario = this._usuarioService
            .borrar(Number(idUsuario));
        var parametrosConsulta = "?accion=borrar&nombre=" + usuario.nombre;
        response.redirect('/Usuario/inicio' + parametrosConsulta);
    };
    AppController.prototype.crearUsuario = function (response) {
        response.render('crear-usuario');
    };
    AppController.prototype.actualizarUsuario = function (idUsuario, response) {
        var usuarioAActualizar = this
            ._usuarioService
            .buscarPorId(Number(idUsuario));
        response.render('crear-usuario', {
            usuario: usuarioAActualizar
        });
    };
    AppController.prototype.actualizarUsuarioFormulario = function (idUsuario, response, usuario) {
        usuario.id = +idUsuario;
        this._usuarioService
            .actualizar(+idUsuario, usuario);
        var parametrosConsulta = "?accion=actualizar&nombre=" + usuario.nombre;
        response.redirect('/Usuario/inicio' + parametrosConsulta);
    };
    AppController.prototype.crearUsuarioFormulario = function (usuario, response) {
        this._usuarioService.crear(usuario);
        var parametrosConsulta = "?accion=crear&nombre=" + usuario.nombre;
        response.redirect('/Usuario/inicio' + parametrosConsulta);
    };
    __decorate([
        common_1.Get('saludar'),
        __param(0, common_1.Query()),
        __param(1, common_1.Query('nombre')),
        __param(2, common_1.Headers('seguridad'))
    ], AppController.prototype, "saludar", null);
    __decorate([
        common_1.Get('segmentoUno/:idUsuario/segmentoDos'),
        __param(0, common_1.Param()),
        __param(1, common_1.Param('idUsuario'))
    ], AppController.prototype, "ruta", null);
    __decorate([
        common_1.Get('despedirse'),
        common_1.HttpCode(201)
    ], AppController.prototype, "despedirse", null);
    __decorate([
        common_1.Get('tomar'),
        common_1.HttpCode(201)
    ], AppController.prototype, "tomar", null);
    __decorate([
        common_1.Get('saludarObservable')
    ], AppController.prototype, "saludarObservable", null);
    __decorate([
        common_1.Get('inicio'),
        __param(0, common_1.Res()),
        __param(1, common_1.Query('accion')),
        __param(2, common_1.Query('nombre')),
        __param(3, common_1.Query('busqueda'))
    ], AppController.prototype, "inicio", null);
    __decorate([
        common_1.Post('borrar/:idUsuario'),
        __param(0, common_1.Param('idUsuario')),
        __param(1, common_1.Res())
    ], AppController.prototype, "borrar", null);
    __decorate([
        common_1.Get('crear-usuario'),
        __param(0, common_1.Res())
    ], AppController.prototype, "crearUsuario", null);
    __decorate([
        common_1.Get('actualizar-usuario/:idUsuario'),
        __param(0, common_1.Param('idUsuario')),
        __param(1, common_1.Res())
    ], AppController.prototype, "actualizarUsuario", null);
    __decorate([
        common_1.Post('actualizar-usuario/:idUsuario'),
        __param(0, common_1.Param('idUsuario')),
        __param(1, common_1.Res()),
        __param(2, common_1.Body())
    ], AppController.prototype, "actualizarUsuarioFormulario", null);
    __decorate([
        common_1.Post('crear-usuario'),
        __param(0, common_1.Body()),
        __param(1, common_1.Res())
    ], AppController.prototype, "crearUsuarioFormulario", null);
    AppController = __decorate([
        common_1.Controller('Usuario') // Decoradores!
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
