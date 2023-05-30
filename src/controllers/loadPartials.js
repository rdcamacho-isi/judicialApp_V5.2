import { validarTipoUsuario } from "./utilidades.js";
import { getCasoViewForm_, getEspecialidadesCasos_, getDataForEditCasoViewForm, getCasosList } from "./caso.js";
import { getClienteViewForm_, getDatosGeograficos_, getDataForEditClienteViewForm, getClientList } from "./cliente.js";

const loadCasosList = async obj => {
    const userType = 'admin'// obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return await getCasosList();
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

const loadCasosForm = async obj => {
    const userType = obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return {
                form: getCasoViewForm_(),
                especialidadesCaso: await getEspecialidadesCasos_()
            }
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

const loadCasosData = async obj => {
    const userType = obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return { form: await getDataForEditCasoViewForm(obj) }
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

const loadClientsList = async obj => {
    const userType = 'admin'// obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return await getClientList();
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

const loadClientForm = async obj => {
    const userType = obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return {
                form: await getClienteViewForm_(),
                datosGeograficos: await getDatosGeograficos_()
            }
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

const loadClientData = async obj => {
    const userType = obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return { form: await getDataForEditClienteViewForm(obj) }
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
    loadCasosList,
    loadCasosForm,
    loadCasosData,
    loadClientsList,
    loadClientForm,
    loadClientData,
}
