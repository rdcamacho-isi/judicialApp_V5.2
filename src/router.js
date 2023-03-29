import { Router } from 'express';
import bodyParser from 'body-parser';
import {dirname,  join} from 'path'
import {fileURLToPath} from 'url'

import * as backend from './controllers/backend.js';
 
const router = Router();

const parser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const __dirname = dirname(fileURLToPath(import.meta.url))

//GET HTTP METHODS

router.get('/',(req,res)=>{
    res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.get('/login',(req,res)=>{
    res.sendFile(join(__dirname, '/views/templates/login.html'))
})

router.get('/home',(req,res)=>{
    res.sendFile(join(__dirname, '/views/templates/home.html'))
})

//POST HTTP METHODS

router.post('/tryLogin',urlencodedParser,async (req,res)=>{
    const dataReq = JSON.parse(JSON.stringify(req.body));
    const result = await backend.loginFunc.login(dataReq.user, dataReq.password);
    res.send(result);
})

router.post('/login',urlencodedParser,async (req,res)=>{
    const dataReq = JSON.parse(JSON.stringify(req.body));
    const result = await backend.loginFunc.loginAndCloseOtherSesions(dataReq.user, dataReq.password);
    res.send(result);
})

router.post('/closeLogin',urlencodedParser,async (req,res)=>{
    const dataReq = JSON.parse(JSON.stringify(req.body));
    const result = await backend.loginFunc.closeLogin(dataReq.sesion, dataReq.trigger);
    res.send(result);
})


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