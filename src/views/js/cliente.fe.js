import { backEndRequest, loadingStart, generateId, loadingEnd } from "./utilidades.je.js";
import { loadFormGhf, builObjToInsert, habilitarEdicionForm, confirmInsertFormGhf, loadDinamicInputs, dataFuncCriteria, numericTempGenerator } from "./Tools/isi/dinamicInput.crud.fe.js";

'use strict'

export const cliente = () => {

    const loadNavbar = async () => {
        let data = await backEndRequest({
            url: 'getNavBar',
            params: {}
        });

        document.querySelector('title').innerHTML = 'Crear cliente';
        document.getElementById('navbar').innerHTML = data.html;
        document.getElementById("user-name").innerHTML = sessionStorage.user;
        document.querySelector('.btn-editar').setAttribute('id', 'persona-5d9vw4xu_z219jaos')
        document.querySelector('.btn-editar').removeAttribute('class');
        loadFormGhfCrearCliente();
    }

    const loadFormGhfCrearCliente = () => {
        const e = {}
        e.target = {}
        e.target.edit = false;
        e.target.modal = false;
        e.partialFuncName = "loadClientView";
        e.partialFuncOtherParam = {};
        e.formId = "form-generic";
        
        e.newFormId = "form-cliente";
        e.noModal = {
            idContainer: "app",
            summitBtnId: "btn-confirmar-crearCliente",
            summitBtnTextContent: "Guardar",
            summitBtnDataSets: [],
            cancelBtnId: "",
            cancelBtnDataSets: []
        };

        e.eazyDropDown = [
            {
                isInTemp: false,
                idsArr: ["paisCliente", "departamentoCliente", "ciudadCliente"],
                arrOtherDataKey: "datosGeograficos"
            }
        ];

        e.buttonsOnTopForm = [];

        // console.log({ baseForm: e })

        loadFormGhf(e);
    }

    const crearCliente = async e => {
        loadingStart();
        const promises = [];

        const objTbl = builObjToInsert("#form-cliente [data-form='cliente']");

        const idTbl = generateId("persona");
        objTbl.obj["XLPYx2KTOqh7VZC10C9NgQ=="] = sessionStorage.user;
        objTbl.obj["rqQ29SZ4T0ZwFHTMIh+WNg=="] = idTbl;
        objTbl.obj["SyLWzgk/D/JN49ylI6DR4w=="] = "S";

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

    const loadforToUpdateCliente = e => {
        const datoInteres = e.target.id; // ID de la fila en la base de datos
        // const datoInteres = typeof e.target.dataset.btnTblGhfOpenModalEditarCliente === "undefined" ? e.target.closest("td").querySelector("button").dataset.btnTblGhfOpenModalEditarCliente : e.target.dataset.btnTblGhfOpenModalEditarCliente;
        document.getElementById('app').innerHTML = ''; // Remover línea
        e.target.edit = true;
        e.target.modal = true;
        e.target.idForEdit = datoInteres;
        e.partialFuncName = "loadClientView";
        e.partialFuncOtherParam = {};
        e.formId = "form-generic";
        
        e.newFormId = "form-cliente";
        e.modal = {
            id: "modal",
            titleId: "modalTitle",
            titleTextContent: "Editar cliente",
            bodyId: "modalBody",
            summitBtnClass: "modalBtnSummit",
            summitBtnId: "btn-confirmar-editarCliente",
            summitBtnTextContent: "Quiero editar algunos datos.",
            summitBtnDataSets: [{ idForEdit: e.target.idForEdit }],
            cancelBtnClass: "modalBtnCancel",
            cancelBtnId: "btn-cerrarModal",
            cancelBtnDataSets: []
        };

        e.eazyDropDown = [
            {
                isInTemp: false,
                idsArr: ["paisCliente", "departamentoCliente", "ciudadCliente"],
                arrOtherDataKey: "datosGeograficos"
            }
        ];
        e.buttonsOnTopForm = [];

        e.idForEdit = e.target.idForEdit;
        e.funcNameGetData = "getDataForEditClientViewForm"; //ESTA ES LA FUNCION DEL SERVERSIDE DESDE DONDE SE OBTIENEN LOS DATOS ejemploSelectDataDinamicInput(e)
        e.enableInput = false;
        e.colEspecificidades = "VgaSiNrAy7C1gYlw9JgkLw==";
        loadFormGhf(e);
    }

    const editarCliente = async e => {
        let promises = [];
        const objTbl = builObjToInsert("#form-cliente [data-form='cliente']");
        objTbl.obj["rqQ29SZ4T0ZwFHTMIh+WNg=="] = e.target.dataset.idForEdit;
        const keyToUpdate = "rqQ29SZ4T0ZwFHTMIh+WNg==";
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
            idBtnSummit: "btn-confirmar-editarCliente",
            innerHtmlBtnSummit: "Quiero editar algunos datos."
        });

        alert("Se ha editado la información");
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
