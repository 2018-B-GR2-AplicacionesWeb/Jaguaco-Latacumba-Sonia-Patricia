"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const usuario_service_1 = require("./usuario/usuario.service");
let AppController = class AppController {
    constructor(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    saludar(queryParams, nombre, seguridad) {
        return nombre;
    }
    ruta(todosParametrosRuta, idUsuario) {
        return idUsuario;
    }
    despedirse() {
        return new Promise((resolve, reject) => {
            throw new common_1.HttpException({
                mensaje: 'Error en despedirse',
            }, 400);
        });
    }
    tomar() {
        return 'Estoy borracho';
    }
    saludarObservable() {
        return rxjs_1.of('Hola mundo');
    }
    inicio(response, accion, nombre, busqueda) {
        let mensaje;
        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }
        let usuarios;
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
    }
    borrar(idUsuario, response) {
        const usuario = this._usuarioService
            .borrar(Number(idUsuario));
        const parametrosConsulta = `?accion=borrar&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }
    crearUsuario(response) {
        response.render('crear-usuario');
    }
    actualizarUsuario(idUsuario, response) {
        const usuarioAActualizar = this
            ._usuarioService
            .buscarPorId(Number(idUsuario));
        response.render('crear-usuario', {
            usuario: usuarioAActualizar
        });
    }
    actualizarUsuarioFormulario(idUsuario, response, usuario) {
        usuario.id = +idUsuario;
        this._usuarioService
            .actualizar(+idUsuario, usuario);
        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }
    crearUsuarioFormulario(usuario, response) {
        this._usuarioService.crear(usuario);
        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }
};
__decorate([
    common_1.Get('saludar'),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('nombre')),
    __param(2, common_1.Headers('seguridad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "saludar", null);
__decorate([
    common_1.Get('segmentoUno/:idUsuario/segmentoDos'),
    __param(0, common_1.Param()),
    __param(1, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "ruta", null);
__decorate([
    common_1.Get('despedirse'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "despedirse", null);
__decorate([
    common_1.Get('tomar'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "tomar", null);
__decorate([
    common_1.Get('saludarObservable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], AppController.prototype, "saludarObservable", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('accion')),
    __param(2, common_1.Query('nombre')),
    __param(3, common_1.Query('busqueda')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    common_1.Post('borrar/:idUsuario'),
    __param(0, common_1.Param('idUsuario')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "borrar", null);
__decorate([
    common_1.Get('crear-usuario'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('actualizar-usuario/:idUsuario'),
    __param(0, common_1.Param('idUsuario')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarUsuario", null);
__decorate([
    common_1.Post('actualizar-usuario/:idUsuario'),
    __param(0, common_1.Param('idUsuario')),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarUsuarioFormulario", null);
__decorate([
    common_1.Post('crear-usuario'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearUsuarioFormulario", null);
AppController = __decorate([
    common_1.Controller('Usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map