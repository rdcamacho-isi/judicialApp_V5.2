import { validarTipoUsuario } from "./utilidades.js";
import { getCasoViewForm_, getEspecialidadesCasos_, getDataForEditCasoViewForm } from "./caso.js";
import { getClienteViewForm_, getDatosGeograficos_, getDataForEditClienteViewForm } from "./cliente.js";

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

const loadCasosData = async obj => {
    const userType = obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return { form: await getDataForEditCasoViewForm(obj) }
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

const loadClientData = async obj => {
    const userType = obj.loginInUse == "false" ? "noAplica" : await validarTipoUsuario(obj.sesion);
    switch (userType) {
        case "noAplica":
            break;
        case "admin":
            return { form: await getDataForEditClienteViewForm(obj) }
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
    loadCasosForm,
    loadCasosData,
    loadClientForm,
    loadClientData
}
