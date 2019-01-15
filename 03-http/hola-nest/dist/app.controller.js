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
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
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
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "saludarObservable", null);
AppController = __decorate([
    common_1.Controller('Usuario')
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map