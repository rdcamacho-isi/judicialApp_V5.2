import * as utilidades from "./utilidades.js";
import * as crearCliente from "./crearCliente.js";
import { getCasoViewForm_, getEspecialidadesCasos_ } from "./Caso.js";
import { getClienteViewForm_, getDatosGeograficos_ } from "./cliente.js";

// function ejemplo crearEmpleado CRUD isi
async function loadClienteData(obj) {
    const userType = obj.loginInUse == "false" ? "noAplica" : await utilidades.validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            return {
                form: await crearCliente.getDataForEditClienteViewForm_(obj)
            }
            break;
        case "admin":
            return {
                form: await crearCliente.getDataForEditClienteViewForm_(obj)
            }
            break;
        case "abogado":
            // code block
            break;
        case "cliente":
            // code block
            break;
        default:
            "No puede hace nada"
    }
}

// function ejemplo crearEmpleado CRUD isi
async function loadClienteForm(obj) {
    const userType = obj.loginInUse == "false" ? "noAplica" : await utilidades.validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            return {
                form: await crearCliente.getClienteViewForm_(),
                datosGeograficos: await crearCliente.getDatosGeograficos_()
            }
            break;
        case "admin":
            return {
                form: await crearCliente.getClienteViewForm_(),
                datosGeograficos: await crearCliente.getDatosGeograficos_()
            }
            break;
        case "abogado":
            // code block
            break;
        case "cliente":
            // code block
            break;
        default:
            "No puede hace nada"
    }
}

async function loadCasosForm(obj) {
    const userType = obj.loginInUse == "false" ? "noAplica" : await utilidades.validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            // return {
            //     form: await crearCliente.getClienteViewForm_(),
            //     datosGeograficos: await crearCliente.getDatosGeograficos_()
            // }
            break;
        case "admin":
            return {
                form: await getCasoViewForm_(),
                especialidadesCaso: await getEspecialidadesCasos_()
            }
            break;
        case "abogado":
            // code block
            break;
        case "cliente":
            // code block
            break;
        default:
            "No puede hace nada"
    }
}

async function loadClienteView(obj) {
    const userType = obj.loginInUse == "false" ? "noAplica" : utilidades.validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "admin":
            return loadPartialHtml_("F-E_genericHtmlTemplate", {
                form: await getClienteViewForm_(),
                datosGeograficos: await getDatosGeograficos_()
            });
            break;
        case "abogado":
            // code block
            break;
        case "cliente":
            // code block
            break;
        default:
        // code block
    }
}

async function loadClientesTblGhfView(obj) {
    const userType = obj.loginInUse == "false" ? "noAplica" : utilidades.validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            // return {
            //     arrOfList: getDataTblGhf_(obj)//ESTA ES LA FUNCION QUE SE DEBE EJECUTAR 
            // }
            break;
        case "admin":
            // code block
            break;
        case "abogado":
            // code block
            break;
        case "cliente":
            // code block
            break;
        default:
            "No puede hace nada"
    }
}

export {
    loadClienteForm,
    loadClienteData,
    loadClienteView,
    loadCasosForm,
    loadClientesTblGhfView,
}
