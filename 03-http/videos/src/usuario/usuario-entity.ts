// usuario-entity.ts

import {BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombre_primero',
            type: 'varchar',
            length: 50,
            default: 'nombre'
        }
    )
    nombre: string;

    @Column({
        nullable: true,
    })
    biografia: string;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }


}