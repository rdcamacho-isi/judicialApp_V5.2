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

export default router