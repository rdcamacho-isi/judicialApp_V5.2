import { index } from './index.fe.js';
import { home } from './home.fe.js';
import { createCaseView, casesListView } from './caso.fe.js';
import { createClientView, clientListView } from './client.fe.js';

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
        casesListView()
        break;

    case 'crearCaso':
        createCaseView()
        break;

    case 'clientes':
        clientListView();
        break;

    case 'crearCliente':
        createClientView();
        break;

    default:
        break;
}
