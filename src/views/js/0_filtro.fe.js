import { index } from './index.fe.js';
import { home } from './home.fe.js';
import { buscarCasos, crearCaso } from './caso.fe.js';
import { buscarClientes, crearCliente } from './cliente.fe.js';

'use strict'

const url = document.location.href.split('/')[3];

switch (url) {

    case '':
        index();
        break;

    case 'home':
        home();
        break;

    case 'casos':
        buscarCasos()
        break;

    case 'crearCaso':
        crearCaso()
        break;

    case 'clientes':
        buscarClientes();
        break;

    case 'crearCliente':
        crearCliente();
        break;

    default:
        break;
}
