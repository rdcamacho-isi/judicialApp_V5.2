import * as utilidades from "./utilidades.je.js";
import * as dinamicInput from "./Tools/isi/dinamicInput.crud.fe.js";

'use strict'

async function loadNavbar() {
    // utilidades.loadingStart();
    let data = await utilidades.backEndRequest({
        url: 'getNavBar',
        params: {}
    });

    document.getElementById('navbar').innerHTML = data.html;
    loadFormToCreateCaso();
}

function loadFormToCreateCaso() {
    let e = {};
    e.target = {};
    e.target.edit = false; // false = insert ; true = update
    e.target.modal = false; // false = no modal ; true = modal
    e.partialFuncName = "loadCasoView"; // Función que ejecuta en el router; Trae el cuerpo del formulario 
    e.partialFuncOtherParam = {}; // Parámetros para el router
    e.formId = "form-generic";
    // Solo se modifican después del último guion
    e.newFormId = "form-caso"; // Identificación del formulario
    e.noModal = {
        idContainer: "app", // Contenedor
        summitBtnId: "btn-confirmar-crearCaso", // id del botón para guardar
        summitBtnTextContent: "Guardar", // Contenido del botón
        summitBtnDataSets: [], // 
        cancelBtnId: "", // id del botón de cancelar
        cancelBtnDataSets: []
    };

    e.eazyDropDown = [
        {
            isInTemp: false, // true si o solo si el elemento está en un template
            idsArr: ["especialidad", "subEspecialidad", "tipoProceso"], // Identifiación de los selectores 
            arrOtherDataKey: "especialidadesCaso" // 
        }
    ];

    e.buttonsOnTopForm = []; // 

    dinamicInput.loadFormGhf(e);
}

async function crearCaso(e) {
    utilidades.loadingStart();
    let promises = [];

    let objTbl = dinamicInput.builObjToInsert("#form-caso [data-form='caso']");

    const idTbl = utilidades.generateId("caso");
    objTbl.obj["mYq3A0MK05A7ytCc2JKxMg=="] = sessionStorage.user;
    objTbl.obj["cInzEYaqzSf7Elfa+y6u7Q=="] = idTbl;

    const obj = await utilidades.backEndRequest({
        url: 'insertBdGhf',
        params: {
            p: objTbl,
            valueToUpdate: idTbl,
            user: sessionStorage.user
        }
    })

    promises.push(obj);
    const response = await Promise.all(promises);

    if (JSON.parse(response).resultInserts[0] == "ok") {
        document.getElementById("subModalBody").innerHTML = "", $('#subModal').modal('hide');
        // getListCasos(e);
        alert("Se ha guardado la información")
    } else {
        alert(JSON.parse(response).resultInserts[1])
    }

    utilidades.loadingEnd();
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
    if (e.target.matches("#btn-confirmar-crearCaso")) {
        e.titleTextContent = "Crear caso";
        e.subModalBody = "Esta segur@ que desea crear este registro?";
        e.summitBtnId = "btn-crearCaso";
        e.summitBtnTextContent = "Guardar";
        e.summitBtnDataSets = [];
        e.seRequiereValidacion = true;
        e.cancelBtnId = "btn-cerrarSubModal";
        dinamicInput.confirmInsertFormGhf(e);
    }
    if (e.target.matches("#btn-crearCaso")) {
        crearCaso(e);
    }
}

//Esta funcion es la que maneja todos los eventos change
function changeEventHandler(e) {
    if (e.target.matches('#start-date')) {
        showTblReports();
    }
}

//Esta funcion es la que maneja todos los eventos input
function inputEventHandler(e) { }

document.querySelector('body').addEventListener("click", clickEventHandler);
document.querySelector('body').addEventListener("change", changeEventHandler);
document.querySelector('body').addEventListener("input", inputEventHandler);
document.addEventListener("DOMContentLoaded", loadNavbar);

document.querySelector('body').addEventListener("click", clickEventHandler);
document.querySelector('body').addEventListener("change", changeEventHandler);
document.querySelector('body').addEventListener("input", inputEventHandler);
document.addEventListener("DOMContentLoaded", loadNavbar);