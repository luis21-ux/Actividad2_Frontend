import { Routes } from '@angular/router';
import { Guardar } from './Components/guardar/guardar';
import { Editar } from './Components/editar/editar';
import { Listar } from './Components/listar/listar';

export const routes: Routes = [

    {
        path: 'listar',
        component : Listar
    },
    {
        path: 'guardar',
        component : Guardar

    },
    {
        path: 'editar/:placa',
        component : Editar
    }
];
