"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let UsuarioService = class UsuarioService {
    constructor() {
        this.usuarios = [
            {
                nombre: 'Adrian',
                biografia: 'Doctor',
                id: 1
            },
            {
                nombre: 'Vicente',
                biografia: 'Maestro',
                id: 2
            },
            {
                nombre: 'Carolina',
                biografia: 'Diseñadora',
                id: 3
            }
        ];
        this.registroActual = 4;
    }
    crear(nuevoUsuario) {
        nuevoUsuario.id = this.registroActual;
        this.registroActual++;
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }
    actualizar(idUsuario, nuevoUsuario) {
        const indiceUsuario = this
            .usuarios
            .findIndex((usuario) => usuario.id === idUsuario);
        this.usuarios[indiceUsuario] = nuevoUsuario;
        return nuevoUsuario;
    }
    borrar(idUsuario) {
        const indiceUsuario = this
            .usuarios
            .findIndex((usuario) => usuario.id === idUsuario);
        const usuarioBorrado = JSON.parse(JSON.stringify(this.usuarios[indiceUsuario]));
        this.usuarios.splice(indiceUsuario, 1);
        return usuarioBorrado;
    }
    buscarPorId(idUsuario) {
        return this.usuarios
            .find((usuario) => {
            return usuario.id === idUsuario;
        });
    }
    buscarPorNombreOBiografia(busqueda) {
        return this.usuarios.filter((usuario) => {
            const tieneAlgoEnElnombre = usuario
                .nombre.includes(busqueda);
            const tieneAlgoEnLaBio = usuario
                .biografia.includes(busqueda);
            return tieneAlgoEnElnombre || tieneAlgoEnLaBio;
        });
    }
};
UsuarioService = __decorate([
    common_1.Injectable()
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map