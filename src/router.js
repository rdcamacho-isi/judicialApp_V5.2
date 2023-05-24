import { Router } from 'express';
import bodyParser from 'body-parser';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios';
import fs from 'fs/promises';
import multer from "multer";
import * as sql from "./controllers/sql.js";

import * as backend from './controllers/backend.js';
import { copyFileSync } from 'fs';

const router = Router();

const parser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const __dirname = dirname(fileURLToPath(import.meta.url))

async function getHtmlContent(filename) {
  try {
    const filePath = join(__dirname, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error('Error reading the file:', error);
    throw error;
  }
}

//GET HTTP METHODS

router.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/login.html'))
})

router.get('/home', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/casos', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/clientes', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/crearCaso', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/crearCliente', (req, res) => {
  res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/loadClientesTblGhfView', async (req, res) => {
  res.send(await backend.loadPartials.loadClientsList());
});

//POST HTTP METHODS

router.post('/getNavBar', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const responseData = {
    html: await getHtmlContent('/views/templates/navbar.html')
  }

  // console.log({backendResponse: responseData});

  res.send(responseData);
});

//Cunado se usa el login con este POST intenta hacerlo
router.post('/tryLogin', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;
  // console.log({dataReq})
  const result = await backend.loginFunc.login(dataReq.user, dataReq.password);
  // console.log({result});
  res.send(result);
});

//Con este POST se realiza el login y cierra las sesiones en otros equipos
router.post('/login', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;
  // console.log({dataReq})
  const result = await backend.loginFunc.loginAndCloseOtherSesions(dataReq.user, dataReq.password);
  res.send(result);
});

//Este POST es para validar si hay sesiones abieras y cerrarla en caso de que no esten ectivas en la BD
router.post('/closeLogin', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;
  // console.log({dataReq})
  const result = await backend.loginFunc.closeLogin(dataReq.sesion, dataReq.trigger);
  res.send(result);
});

//Este POST es para  ejecutar la funcion insertar para los CRUD en la BD
router.post('/insertBdGhf', bodyParser.json(), async (req, res) => {
  console.log({ postEnEjecucion: 'insertBdGhf' })
  console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = JSON.parse(JSON.stringify(req.body.data));

  console.log({ dataReq });

  const resultInserts = await backend.dinamicInput.insertEncriptedObjInBd(dataReq.p, dataReq.user, dataReq.valueToUpdate);

  if (resultInserts != "ok") {
    //Enviar correo indicando que hubo un error en el aplicativo
  }
  if (typeof dataReq.otherFunc === "undefined") {
    res.send(JSON.stringify({ resultInserts: resultInserts, data: false }));
  } else {
    res.send(JSON.stringify({ resultInserts: resultInserts, data: backend[dataReq.otherFunc](dataReq.criteriaOtherFunc) }));
  }
});

router.post('/updateBdGhf', bodyParser.json(), async (req, res) => {
  console.log({ postEnEjecucion: 'updateBdGhf' })
  console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = JSON.parse(JSON.stringify(req.body.data));

  console.log({ dataReq });

  const resultInserts = await backend.dinamicInput.updateEncriptedObjInBd(dataReq.p, dataReq.keyToUpdate, dataReq.valueToUpdate, dataReq.user);

  if (resultInserts != "ok") {
    //Enviar correo indicando que hubo un error en el aplicativo
  }
  if (typeof dataReq.otherFunc === "undefined") {
    res.send(JSON.stringify({ resultInserts: resultInserts, data: false }));
  } else {
    res.send(JSON.stringify({ resultInserts: resultInserts, data: backend[dataReq.otherFunc](dataReq.criteriaOtherFunc) }));
  }
});

router.post('/loadCasoView', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;

  const responseData = {
    otherData: await backend.loadPartials.loadCasosForm(dataReq),
    html: await getHtmlContent('/views/templates/views/genericHtmlTemp.crud.html')
  }

  // console.log({backendResponse: responseData});

  res.send(responseData);
});

router.post('/loadClientView', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;

  const responseData = {
    otherData: await backend.loadPartials.loadClientForm(dataReq),
    html: await getHtmlContent('/views/templates/views/genericHtmlTemp.crud.html')
  }

  // console.log({backendResponse: responseData});

  res.send(responseData);
});

router.post('/getDataForEditClientViewForm', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;

  const responseData = {
    otherData: await backend.loadPartials.loadClientData(dataReq),
    html: await getHtmlContent('/views/templates/views/genericHtmlTemp.crud.html')
  }

  // console.log({backendResponse: responseData});

  res.send(responseData);
});

router.post('/getDataForEditCasoViewForm', bodyParser.json(), async (req, res) => {
  // console.log({ paramsFromFrontEnd: req.body.data });
  if (!req.body.data) {
    console.log('No data found in the request body');
    res.status(400).send('Bad Request: No data found in the request body');
    return;
  }

  const dataReq = req.body.data;

  const responseData = {
    otherData: await backend.loadPartials.loadCasosData(dataReq),
    html: await getHtmlContent('/views/templates/views/genericHtmlTemp.crud.html')
  }

  // console.log({backendResponse: responseData});

  res.send(responseData);
});

// loadClientesTblGhfView
// router.post('/loadClientesTblGhfView', bodyParser.json(), async (req, res) => {
//   // console.log({ paramsFromFrontEnd: req.body.data });
//   if (!req.body.data) {
//     console.log('No data found in the request body');
//     res.status(400).send('Bad Request: No data found in the request body');
//     return;
//   }

//   const dataReq = req.body.data;

//   const responseData = {
//     otherData: await backend.loadPartials.loadClientsList(dataReq),
//     html: await getHtmlContent('/views/templates/views/genericHtmlTemp.crud.html')
//   }

//   // console.log({backendResponse: responseData});

//   res.send(responseData);
// });

async function axiosTest(url, data) {
  try {
    const response = await axios.post(`http://localhost:8080/${url}`, { data }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.clear()
    // console.log({ otherData: response.data });
  } catch (error) {
    console.clear()
    console.error('Error:', error);
  }
}



// axiosTest("authorizeSendingInvoices", {
//   user: 'ruben',
//   authorizations: ['2396', '2447']
// }
// );



// SUBIR ARCHIVOS DESDE EL FRONT-END
// La función upload utiliza la librería multer para manejar la subida de archivos y especifica la ubicación en el servidor donde se guardarán los archivos. Además, la función asigna un nombre único al archivo subido al servidor que incluye la fecha actual y el nombre original del archivo.

// El router POST /insertBd usa el middleware upload.single para manejar la subida de un solo archivo con el campo name "archivo". Luego, llama a la función backend.insertBd con los datos enviados en el cuerpo de la solicitud y el nombre de archivo generado por multer. Finalmente, envía la respuesta devuelta por backend.insertBd al cliente.

// let filename = ''
// const upload = multer({
// // dest: 'src',
//     storage: multer.diskStorage({
//         destination: 'src/controllers/doc',
//         filename: function (req, file, cb) {
//             filename = `${Date.now()}-${file.originalname}`
//             cb(null, filename)
//         }
//     })
// })

// router.post('/insertBd', upload.single('archivo'), async (req, res) => {

//     const response = await backend.insertBd(req.body, filename)

//     res.send(response)
// })

export default router
