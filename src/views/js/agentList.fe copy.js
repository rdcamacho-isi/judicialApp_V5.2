// Ejemplo

import * as utilidades from "./utilidades.je.js";
import * as dinamicInput from "./Tools/isi/dinamicInput.crud.fe.js";

'use strict'

async function editarCliente(e) {
    utilidades.loadingStart();
    let promises = [];
    const objTbl = dinamicInput.builObjToInsert("#form-cliente [data-form='cliente']"); // Solo se cambia 'cliente' por lo que se vaya a editar
    objTbl.obj["rqQ29SZ4T0ZwFHTMIh+WNg=="] = e.target.dataset.idForEdit; // Columna con la que se va a relacionar para realizar la edición
    const keyToUpdate = "rqQ29SZ4T0ZwFHTMIh+WNg==";
    const valueToUpdate = e.target.dataset.idForEdit;

    objTbl.colsToUpdate = objTbl.obj;

    const obj = await utilidades.backEndRequest({ // Esto reemplaza 'runGoogleScript'
        url: 'updateBdGhf',
        params: {
            p: objTbl,
            keyToUpdate: keyToUpdate,
            valueToUpdate: valueToUpdate,
            user: sessionStorage.user
        }
    })

    promises.push(obj);

    const response = await Promise.all(promises);

    dinamicInput.habilitarEdicionForm({ //
        idModalBody: "modalBody",
        disabled: true,
        idBtnSummit: "btn-confirmar-editarCliente",
        innerHtmlBtnSummit: "Quiero editar algunos datos."
    });
    // window.location.href = "./agentList"; //
    alert("Se ha editado la información")
    utilidades.loadingEnd();
}

function loadforToUpdateCliente(e) {
    const datoInteres = e.target.id; // ID de la fila en la base de datos

    console.log({datoInteres});
    // const datoInteres = "persona-pooakxhk_8kcaup43";
    e.target.edit = true; // En este caso es un formulario de edición -> true
    e.target.modal = true; // Queremos que sea en un modal -> true
    e.target.idForEdit = datoInteres; // Dato para edición 
    e.partialFuncName = "loadClienteView"; // Función a ejecutar en router
    e.partialFuncOtherParam = {}; // Parámetros que se le pueden pasar a la función
    e.formId = "form-generic"; // No se cambia
    // Se cambian desde el último guion
    e.newFormId = "form-cliente";
    e.modal = { // Como se modal es .modal
        id: "modal", // Identificación del modal ; No se cambia
        titleId: "modalTitle", // Identificación al título del modal
        titleTextContent: "Edit agent", // Título del modal
        bodyId: "modalBody", // ID del body ; No se cambia
        summitBtnClass: "modalBtnSummit", // Botón de envío ; No se cambia
        summitBtnId: "btn-confirmar-editarCliente", // 
        summitBtnTextContent: "I want to edit some data.", // Contenido del botón de editar
        summitBtnDataSets: [{ idForEdit: e.target.idForEdit }], // Siempre se envía el mismo dataset
        cancelBtnClass: "modalBtnCancel", // 
        cancelBtnId: "btn-cerrarModal", //
        cancelBtnTextContent: "Cancel", //
        cancelBtnDataSets: [] //
    };

    e.eazyDropDown = [];
    e.buttonsOnTopForm = [];

    e.idForEdit = e.target.idForEdit;
    e.funcNameGetData = "getDataForEditClienteViewForm";//ESTA ES LA FUNCION DEL SERVERSIDE DESDE DONDE SE OBTIENEN LOS DATOS ejemploSelectDataDinamicInput(e)
    e.enableInput = false; // Siempre en false
    e.colEspecificidades = "VgaSiNrAy7C1gYlw9JgkLw=="; // HASH
    dinamicInput.loadFormGhf(e);
}

async function loadNavbar() {
    let data = await utilidades.backEndRequest({
        url: 'getNavBar',
        params: {}
    });

    document.getElementById('navbar').innerHTML = data.html;
    loadAgentList()
    
}


////A PARTIR DE AQUÍ EMPIEZAN LOS MANEJADORES DE EVENTOS

//Esta funcion es la que maneja todos los eventos clic
function clickEventHandler(e) {
    //modals
    if (e.target.matches(".closeModalGhf, .closeModalGhf *")) {
        const modal = e.target.closest(".modal");
        modal.querySelector(".modal-body").innerHTML = "";
        $('#' + modal.id).modal('hide');
    }
    //modals  

    if (e.target.matches(".openClientFormToEdit, .openClientFormToEdit *")) {
        loadforToUpdateCliente(e)
    }


    if (e.target.matches("#btn-EditarCliente")) {
        editarCliente(e);
    }

    if (e.target.matches("#btn-confirmar-editarCliente")) {
        dinamicInput.habilitarEdicionForm({
            idModalBody: "modalBody",
            disabled: false,
            idBtnSummit: "btn-EditarCliente", // Solo se cambia después del último guion
            innerHtmlBtnSummit: "Editar." // 
        })
    }

    if (e.target.matches("#btn-cerrarModal")) {
        const modalId = e.target.closest(".modal").id;
        $(`#${modalId}`).modal('hide');
    }    


    
}


//Esta funcion es la que maneja todos los eventos change
function changeEventHandler(e) {
    ///Dinamic-Input-isi: Inicio codicionales
    if (e.target.matches(".triggerDinamicSelectGhf")) {
        dinamicInput.loadDinamicInputs(e, true);
    }

    if (e.target.matches(".dinamicSelectGhf")) {
        if (e.target.dataset.funcCriteria != "no") {
            dinamicInput.dataFuncCriteria(e, true);
        }
    }
    ///Dinamic-Input-isi: Fin codicionales
}

//Esta funcion es la que maneja todos los eventos input
function inputEventHandler(e) {
    ///Dinamic-Input-isi: Inicio codicionales para generar subformularios a partir de un input numerico
    if (e.target.matches(".dinamicInputGhf")) {
        dinamicInput.numericTempGenerator(e, true);
    }
    ///Dinamic-Input-isi: Inicio codicionales para generar subformularios a partir de un input numerico

}



document.querySelector('body').addEventListener("click", clickEventHandler);
document.querySelector('body').addEventListener("change", changeEventHandler);
document.querySelector('body').addEventListener("input", inputEventHandler);
document.addEventListener("DOMContentLoaded",loadNavbar);