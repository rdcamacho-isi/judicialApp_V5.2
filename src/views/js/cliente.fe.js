import { backEndRequest, loadingStart, generateId, loadingEnd } from "./utilidades.je.js";
import { loadFormGhf, builObjToInsert, habilitarEdicionForm, confirmInsertFormGhf, loadDinamicInputs, dataFuncCriteria, numericTempGenerator } from "./Tools/isi/dinamicInput.crud.fe.js";

'use strict'

export const crearCliente = () => {

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

export const buscarClientes = () => {

    const loadNavbar = async () => {
        let data = await backEndRequest({
            url: 'getNavBar',
            params: {}
        });

        document.querySelector('title').innerHTML = 'Crear cliente';
        document.getElementById('navbar').innerHTML = data.html;
        document.getElementById("user-name").innerHTML = sessionStorage.user;
        getListClientes();
    }

    const getListClientes = async () => {
        try {
            const response = await fetch('/loadClientesTblGhfView', { method: 'GET' });
            if (!response.ok) {
                throw new Error('Error en la respuesta de la solicitud');
            }
            const data = await response.json();
            console.log(data);

            // Función para generar la tabla dinámica
            const generateTable = (clients) => {
                // Obtener el elemento contenedor donde se insertará la tabla
                const tableContainer = document.getElementById('table-container');

                // Limpiar el contenedor antes de insertar la nueva tabla
                tableContainer.innerHTML = '';

                // Crear la tabla
                const table = document.createElement('table');
                table.classList.add('table', 'striped');

                // Crear el encabezado de la tabla
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['Nombre', 'Tipo personas', 'Tipo identificación', 'Identificación', 'Creado por', ''];
                headers.forEach((header) => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Crear el cuerpo de la tabla
                const tbody = document.createElement('tbody');
                clients.forEach((client) => {
                    const row = document.createElement('tr');

                    // Columna de Nombre (mezcla de nombre y apellido)
                    const nameColumn = document.createElement('td');
                    nameColumn.textContent = `${client.nombre} ${client.apellido}`;
                    row.appendChild(nameColumn);

                    // Columna de Tipo personas
                    const typeColumn = document.createElement('td');
                    typeColumn.textContent = client.tipoPersona;
                    row.appendChild(typeColumn);

                    // Columna de Tipo identificación
                    const identificationTypeColumn = document.createElement('td');
                    identificationTypeColumn.textContent = client.tipoIdentificacion;
                    row.appendChild(identificationTypeColumn);

                    // Columna de Identificación
                    const identificationColumn = document.createElement('td');
                    identificationColumn.textContent = client.numeroIdentificacion;
                    row.appendChild(identificationColumn);

                    // Columna de Creado por
                    const createdByColumn = document.createElement('td');
                    createdByColumn.textContent = client.Usuario;
                    row.appendChild(createdByColumn);

                    // Columna de botones (Editar y Eliminar)
                    const buttonsColumn = document.createElement('td');
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.classList.add('edit-button');
                    editButton.dataset.clientId = client.idPersonas;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.classList.add('delete-button');
                    deleteButton.dataset.clientId = client.idPersonas;
                    buttonsColumn.appendChild(editButton);
                    buttonsColumn.appendChild(deleteButton);
                    row.appendChild(buttonsColumn);

                    tbody.appendChild(row);
                });

                table.appendChild(tbody);
                tableContainer.appendChild(table);
            };

            // Variables de paginación
            const recordsPerPage = 10;
            let currentPage = 1;
            let filteredClients = [...data];

            // Generar la tabla inicial
            generateTable(filteredClients);

            // Funciones de paginación
            const goToPage = (page) => {
                currentPage = page;
                generateTable(getClientsToShow());
            };

            const goToNextPage = () => {
                if (currentPage < getTotalPages()) {
                    currentPage++;
                    generateTable(getClientsToShow());
                }
            };

            const goToPreviousPage = () => {
                if (currentPage > 1) {
                    currentPage--;
                    generateTable(getClientsToShow());
                }
            };

            const getTotalPages = () => Math.ceil(filteredClients.length / recordsPerPage);

            const getClientsToShow = () => {
                const startIndex = (currentPage - 1) * recordsPerPage;
                const endIndex = startIndex + recordsPerPage;
                return filteredClients.slice(startIndex, endIndex);
            };

            // Agregar elementos de paginación
            const paginationContainer = document.getElementById('pagination-container');
            paginationContainer.innerHTML = '';

            const paginationNav = document.createElement('nav');
            const ul = document.createElement('ul');
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Anterior';
            prevButton.addEventListener('click', goToPreviousPage);
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Siguiente';
            nextButton.addEventListener('click', goToNextPage);
            ul.appendChild(prevButton);

            const totalPages = getTotalPages();
            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => goToPage(i));
                li.appendChild(pageButton);
                ul.appendChild(li);
            }

            ul.appendChild(nextButton);
            paginationNav.appendChild(ul);
            paginationContainer.appendChild(paginationNav);

            // Función para filtrar la tabla mediante el campo de búsqueda
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                filteredClients = data.filter((client) => {
                    return (
                        client.nombre.toLowerCase().includes(searchTerm) ||
                        client.apellido.toLowerCase().includes(searchTerm) ||
                        client.tipoPersona.toLowerCase().includes(searchTerm) ||
                        client.tipoIdentificacion.toLowerCase().includes(searchTerm) ||
                        client.numeroIdentificacion.toLowerCase().includes(searchTerm) ||
                        client.Usuario.toLowerCase().includes(searchTerm)
                    );
                });

                currentPage = 1;
                generateTable(getClientsToShow());
            });
        } catch (error) {
            console.error('Error:', error);
        }
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