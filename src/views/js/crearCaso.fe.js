// import * as dinamicInput from "./Tools/isi/dinamicInput.crud.fe.js";

function loadFormToCreateCaso(e) {
    e.target.edit = false;
    e.target.modal = false;
    e.partialFuncName = "loadCasoView";
    e.partialFuncOtherParam = {};
    e.formId = "form-generic";
    e.newFormId = "form-caso";
    e.noModal = {
        idContainer: "app",
        summitBtnId: "btn-confirmar-crearCaso",
        summitBtnTextContent: "Guardar",
        summitBtnDataSets: [],
        cancelBtnId: "",
        cancelBtnDataSets: []
    };

    e.eazyDropDown = [
        {
            isInTemp: false,
            idsArr: ["especialidad", "subEspecialidad", "tipoProceso"],
            arrOtherDataKey: "especialidadesCaso"
        }
    ];

    e.buttonsOnTopForm = [];

    dinamicInput.loadFormGhf(e);
}