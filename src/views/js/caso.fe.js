import { backEndRequest, loadingStart, generateId, loadingEnd } from "./utilidades.je.js";
import { loadFormGhf, builObjToInsert, habilitarEdicionForm } from "./Tools/isi/dinamicInput.crud.fe.js";
import { buildTableISI } from './Tools/isi/tableISI.fe.js'

'use strict'

export const crearCaso = () => {

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
            window.location.href = "./home";
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
            cancelBtnDataSets: [] //
        };

        e.eazyDropDown = [
            {
                isInTemp: false, // true si o solo si el elemento está en un template
                idsArr: ["especialidad", "subEspecialidad", "tipoProceso"], // Identifiación de los selectores 
                arrOtherDataKey: "especialidadesCaso" // 
            }
        ];
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

        if (e.target.matches("#btn-EditarCliente")) {
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

export const buscarCasos = () => {

    const loadNavbar = async () => {
        let data = await backEndRequest({
            url: 'getNavBar',
            params: {}
        });

        document.querySelector('title').innerHTML = 'Crear cliente';
        document.getElementById('navbar').innerHTML = data.html;
        document.getElementById("user-name").innerHTML = sessionStorage.user;
        getClientList();
    }

    const getClientList = async () => {
        const response = await fetch('/loadCasosTblGhfView', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Error en la respuesta de la solicitud');
        }

        buildTableISI(await response.json(), {
            id: 'id-isi-table',
            name: 'Casos',
            config: {
                lengthMenu: [3, 5, 10, 15, 20],
                columnDefs: [
                    { orderable: false, targets: [2, 3] },
                ],
                pageLength: 10,
                pagingType: 'full_numbers',
                destroy: true,
                language: {
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    zeroRecords: "Ningún usuario encontrado",
                    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
                    infoEmpty: "Ningún usuario encontrado",
                    infoFiltered: "(filtrados desde _MAX_ registros totales)",
                    search: "Buscar:",
                    loadingRecords: "Cargando...",
                    paginate: {
                        first: "Primero",
                        last: "Último",
                        next: "Siguiente",
                        previous: "Anterior"
                    }
                }
            }
        });
    }

    ////A PARTIR DE AQUÍ EMPIEZAN LOS MANEJADORES DE EVENTOS

    //Esta funcion es la que maneja todos los eventos clic
    const clickEventHandler = e => {
        //modals
        if (e.target.matches(".closeModalGhf, .closeModalGhf *")) {
            const modal = e.target.closest(".modal");
            modal.querySelector(".modal-body").innerHTML = "";
            $('#' + modal.id).modal('hide');
        }
        //modals  

        // if (e.target.matches("#crearCliente")) {
        //     loadFormIsiCrearCliente(e)
        // }

        // Editar
        if (e.target.matches('#persona-5d9vw4xu_z219jaos')) {
            // cliente-3d70nms200_2q39j0qm8n
            loadforToUpdateCliente(e)
        }

        if (e.target.matches("#btn-confirmar-crearCliente")) {
            e.titleTextContent = "Create agent";
            e.subModalBody = "Are you sure you want to create this agent?";
            e.summitBtnId = "btn-crearCliente";
            e.summitBtnTextContent = "Save";
            e.summitBtnDataSets = [];
            e.seRequiereValidacion = true;
            e.cancelBtnId = "btn-cerrarSubModal";

            confirmInsertFormGhf(e);
        }

        if (e.target.matches("#btn-crearCliente")) {
            crearCliente(e);
        }

        if (e.target.matches("#verDatosCliente")) {
            loadforToUpdateCliente(e)
        }

        if (e.target.matches("#btn-EditarCliente")) {
            editarCliente(e);
        }

        if (e.target.matches("#btn-confirmar-editarCliente")) {
            habilitarEdicionForm({
                idModalBody: "modalBody",
                disabled: false,
                idBtnSummit: "btn-EditarCliente",
                innerHtmlBtnSummit: "Editar."
            })
        }
    }

    //Esta funcion es la que maneja todos los eventos change
    const changeEventHandler = e => {
        ///Dinamic-Input-isi: Inicio codicionales
        if (e.target.matches(".triggerDinamicSelectGhf")) {
            loadDinamicInputs(e, true);
        }

        if (e.target.matches(".dinamicSelectGhf")) {
            if (e.target.dataset.funcCriteria != "no") {
                dataFuncCriteria(e, true);
            }
        }
        ///Dinamic-Input-isi: Fin codicionales
    }

    //Esta funcion es la que maneja todos los eventos input
    const inputEventHandler = e => {
        ///Dinamic-Input-isi: Inicio codicionales para generar subformularios a partir de un input numerico
        if (e.target.matches(".dinamicInputGhf")) {
            numericTempGenerator(e, true);
        }
        ///Dinamic-Input-isi: Inicio codicionales para generar subformularios a partir de un input numerico
    }

    document.querySelector('body').addEventListener("click", clickEventHandler);
    document.querySelector('body').addEventListener("change", changeEventHandler);
    document.querySelector('body').addEventListener("input", inputEventHandler);
    document.addEventListener("DOMContentLoaded", loadNavbar);
}