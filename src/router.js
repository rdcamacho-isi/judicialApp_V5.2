import { Router } from 'express';
import bodyParser from 'body-parser';
import {dirname,  join} from 'path'
import {fileURLToPath} from 'url'

import backend from './controllers/backend.js';

const router = Router();

const parser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const __dirname = dirname(fileURLToPath(import.meta.url))

router.get('/',(req,res)=>{
    res.sendFile(join(__dirname, '/views/templates/index.html'))
})

router.post('/',urlencodedParser,(req,res)=>{
    
    const dataReq = JSON.parse(JSON.stringify(req.body))
    const response = backend.sayHi(dataReq.name)

    res.send(response)
})

export default router