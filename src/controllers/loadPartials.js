import * as utilidades from "./utilidades.js";
import * as crearCliente from "./crearCliente.js";
import * as casos from "./Caso.js";

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
                form: await casos.getCasoViewForm_(),
                especialidadesCaso: await casos.getEspecialidadesCasos_()
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

async function loadClientesTblGhfView(obj) {
    const userType = obj.loginInUse == "false" ? "noAplica" : utilidades.validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            return {
                arrOfList: getDataTblGhf_(obj)//ESTA ES LA FUNCION QUE SE DEBE EJECUTAR 
            }
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
    loadCasosForm
}