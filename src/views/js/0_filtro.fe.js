import { index } from './index.fe.js';
import { home } from './home.fe.js';
import { caso } from './caso.fe.js';
import { cliente } from './cliente.fe.js';

'use strict'

const url = document.location.href.split('/')[3];

switch (url) {
    
    case '':
        index();
        break;

    case 'home':
        home();
        break;

    case 'crearCaso':
        caso()
        break;

    case 'crearCliente':
        cliente();
        break;

    default:
        break;
}
