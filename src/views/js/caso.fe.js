import { backEndRequest, loadingStart, generateId, loadingEnd } from "./utilidades.je.js";
import { loadFormGhf, builObjToInsert, habilitarEdicionForm } from "./Tools/isi/dinamicInput.crud.fe.js";

'use strict'

export const caso = () => {

    const loadNavbar = async () => {
        const data = await backEndRequest({
            url: 'getNavBar',
            params: {}
        });

        document.querySelector('title').innerHTML = 'Crear caso';
        document.getElementById('navbar').innerHTML = data.html;
        document.getElementById("user-name").innerHTML = sessionStorage.user;
        document.querySelector('.btn-editar').setAttribute('id', 'caso-8t2dm6th_gzsqc1q8')
        document.querySelector('.btn-editar').removeAttribute('class');
        loadFormToCreateCaso();
    }

    const loadFormToCreateCaso = () => {
        const e = {};
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

        loadFormGhf(e);
    }

    const crearCaso = async e => {
        loadingStart();
        const promises = [];

        const objTbl = builObjToInsert("#form-caso [data-form='caso']");

        const idTbl = generateId("caso");
        objTbl.obj["mYq3A0MK05A7ytCc2JKxMg=="] = sessionStorage.user;
        objTbl.obj["cInzEYaqzSf7Elfa+y6u7Q=="] = idTbl;

        const obj = await backEndRequest({
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

        loadingEnd();
    }

    const loadforToUpdateCaso = e => {
        const datoInteres = e.target.id; // ID de la fila en la base de datos
        document.getElementById('app').innerHTML = ''; // Remover línea
        e.target.edit = true; // En este caso es un formulario de edición -> true
        e.target.modal = true; // Queremos que sea en un modal -> true
        e.target.idForEdit = datoInteres; // Dato para edición 
        e.partialFuncName = "loadCasoView"; // Función a ejecutar en router
        e.partialFuncOtherParam = {}; // Parámetros que se le pueden pasar a la función
        e.formId = "form-generic"; // No se cambia
        // Se cambian desde el último guion
        e.newFormId = "form-caso";
        e.modal = { // Como se modal es .modal
            id: "modal", // Identificación del modal ; No se cambia
            titleId: "modalTitle", // Identificación al título del modal
            titleTextContent: "Editar caso", // Título del modal
            bodyId: "modalBody", // ID del body ; No se cambia
            summitBtnClass: "modalBtnSummit", // Botón de envío ; No se cambia
            summitBtnId: "btn-confirmar-editarCaso", // 
            summitBtnTextContent: "Quiero editar algunos datos.", // Contenido del botón de editar
            summitBtnDataSets: [{ idForEdit: e.target.idForEdit }], // Siempre se envía el mismo dataset
            cancelBtnClass: "modalBtnCancel", // 
            cancelBtnId: "btn-cerrarModal", //
            cancelBtnTextContent: "Cancel", //
            cancelBtnDataSets: [] //
        };

        e.eazyDropDown = [];
        e.buttonsOnTopForm = [];

        e.idForEdit = e.target.idForEdit;
        e.funcNameGetData = "getDataForEditCasoViewForm";//ESTA ES LA FUNCION DEL SERVERSIDE DESDE DONDE SE OBTIENEN LOS DATOS ejemploSelectDataDinamicInput(e)
        e.enableInput = false; // Siempre en false
        e.colEspecificidades = "zOCfLHoM8aYLVGgBlq3eCg=="; // HASH
        loadFormGhf(e);
    }

    const editarCaso = async e => {
        let promises = [];
        const objTbl = builObjToInsert("#form-caso [data-form='caso']");
        objTbl.obj["cInzEYaqzSf7Elfa+y6u7Q=="] = e.target.dataset.idForEdit; // 
        const keyToUpdate = "cInzEYaqzSf7Elfa+y6u7Q==";
        const valueToUpdate = e.target.dataset.idForEdit;

        objTbl.colsToUpdate = objTbl.obj;

        const dataTbl = await backEndRequest({ // Esto reemplaza 'runGoogleScript'
            url: 'updateBdGhf',
            params: {
                p: objTbl,
                keyToUpdate: keyToUpdate,
                valueToUpdate: valueToUpdate,
                user: sessionStorage.user
            }
        })

        promises.push(dataTbl);

        const response = await Promise.all(promises);

        habilitarEdicionForm({
            idModalBody: "modalBody",
            disabled: true,
            idBtnSummit: "btn-confirmar-editarCaso",
            innerHtmlBtnSummit: "Quiero editar algunos datos."
        });

        alert("Se ha editado la información");
    }

    ////A PARTIR DE AQUÍ EMPIEZAN LOS MANEJADORES DE EVENTOS

    //Esta funcion es la que maneja todos los eventos clic
    const clickEventHandler = async e => {
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

        if (e.target.matches('#caso-8t2dm6th_gzsqc1q8')) {
            loadforToUpdateCaso(e)
        }

        if (e.target.matches("#btn-EditarCaso")) {
            editarCaso(e);
        }

        if (e.target.matches("#btn-confirmar-editarCaso")) {
            habilitarEdicionForm({
                idModalBody: "modalBody",
                disabled: false,
                idBtnSummit: "btn-EditarCliente",
                innerHtmlBtnSummit: "Editar."
            })
        }
    }

    //Esta funcion es la que maneja todos los eventos change
    const changeEventHandler = e => { if (e.target.matches('#start-date')) showTblReports(); }

    //Esta funcion es la que maneja todos los eventos input
    const inputEventHandler = e => { }

    document.querySelector('body').addEventListener("click", clickEventHandler);
    document.querySelector('body').addEventListener("change", changeEventHandler);
    document.querySelector('body').addEventListener("input", inputEventHandler);
    document.addEventListener("DOMContentLoaded", loadNavbar);
}
