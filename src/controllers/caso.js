import { utilidades } from "./backend.js";
import * as sql from "./sql.js";
import * as dinamicInput from "./Tools/dinamicInput.crud.be.js";

function getCasoViewForm_() {
    // idsArr: ["especialidad", "subEspecialidad", "tipoProceso"],
    return [
        {//START INPUT nombreCaso
            "label": {
                "titulo": "Nombre caso",
                "forAttr": "nombreCaso"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "nombreCaso" },
                { "type": "text" },
                { "required": "" },
                { "list": "list-nombreCaso" },
                { "name": "name-nombreCaso" },
                { "onkeyup": "this.value = this.value.toUpperCase();" }
            ],
            "datasetTag": [
                { "form": "caso" },
                { "cbd": "Qya6u62UKPcn9SiOklpsoQ==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "numericTempGenerator": "no" },
                { "rowTitle": "no" }
            ]
        }//END INPUT
        ,
        {//START INPUT fechaEfectivaAsignacion
            "label": {
                "titulo": "Fecha efectiva asignación caso",
                "forAttr": "fechaEfectivaAsignacion"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "fechaEfectivaAsignacion" },
                { "type": "date" },
                { "required": "" },
                { "list": "list-fechaEfectivaAsignacion" },
                { "name": "name-fechaEfectivaAsignacion" }
            ],
            "datasetTag": [
                { "form": "caso" },
                { "cbd": "yUZ05wCVrZDp+N749IVlIQ==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "numericTempGenerator": "no" },
                { "rowTitle": "no" }
            ]
        }//END INPUT
        ,
        {//START SELECT especialidad
            "label": {
                "titulo": "Especialidad",
                "forAttr": "especialidad"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "especialidad" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "caso" },
                { "cbd": "zOCfLHoM8aYLVGgBlq3eCg==" },
                { "bdlf": "no" },
                { "json": "especialidad" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "no" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT    
        ,
        {//START SELECT subEspecialidadCaso
            "label": {
                "titulo": "Sub-Especialidad de caso",
                "forAttr": "subEspecialidad"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "subEspecialidad" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "caso" },
                { "cbd": "zOCfLHoM8aYLVGgBlq3eCg==" },
                { "bdlf": "" },
                { "json": "subEspecialidad" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "especialidad" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT
        ,
        {//START SELECT tipoProceso
            "label": {
                "titulo": "Tipo de proceso",
                "forAttr": "tipoProceso"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "tipoProceso" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "caso" },
                { "cbd": "foRICAKP3R28Ex6woxJdMg==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "especialidad|subEspecialidad" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT  
        ,
        {//START SUMMER NOTE descripcionCaso
            "label": { "titulo": "Descripción" },
            "tipoTag": "dinamicSummernoteGhf",
            "placeholder": "",
            "atributosTag": [
                { "id": "descripcionCaso" },
                { "name": "name-descripcionCaso" }
            ],
            "datasetTag": [
                { "form": "caso" },
                { "cbd": "gSloVLdLashThNrCsqhlww==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "si" }
            ]
        }//END SUMMER NOTE         
    ]
}

async function getEspecialidadesCasos_() {
    const r = await sql.bdConnection('select', `SELECT
    Tbl_flujo_especialidades.especialidad,
    Tbl_flujo_especialidades.subEspecialidad,
    CONCAT(Tbl_flujo_especialidades.tipoProceso,"|",Tbl_flujo_especialidades.idEspecialidades) AS tipoProceso
    FROM
        Tbl_flujo_especialidades
    WHERE Tbl_flujo_especialidades.Estado = "A"
    ORDER BY Tbl_flujo_especialidades.especialidad, Tbl_flujo_especialidades.subEspecialidad, Tbl_flujo_especialidades.tipoProceso`)

    return r.resultAsTwoDimesionalArr;
}

async function getDataForEditCasoViewForm(criteriosFrontEnd) {
    let objWithEncriptedCols = await sql.bdConnection('select', `SELECT
        MAX(Tbl_0_log.idLog) AS id,
        Tbl_0_log.obj,
        Tbl_0_log.idUpdated
    FROM
        Tbl_0_log
    WHERE
        Tbl_0_log.idUpdated = "${criteriosFrontEnd.id}" AND Tbl_0_log.idLog =(
        SELECT
            MAX(Tbl_0_log.idLog) AS id
        FROM
            Tbl_0_log
        WHERE
            Tbl_0_log.idUpdated = "${criteriosFrontEnd.id}"
    )`)

    objWithEncriptedCols = objWithEncriptedCols.resultAsObj;

    objWithEncriptedCols = JSON.parse(utilidades.fixJson(objWithEncriptedCols[0]["obj"])) //Esta linea es necesaria para solucionar saltos de linea y tab spaces en summer note y text area
    objWithEncriptedCols["keysBd"] = objWithEncriptedCols.obj;

    const whereCriteria = `WHERE Tbl_A_casos.idCasos = "${criteriosFrontEnd.id}"`; // Sólamente cambia esta línea

    return {
        keyAndValues: JSON.stringify(dinamicInput.selectEncriptedObjInBd(objWithEncriptedCols, whereCriteria)),
        lastFormSaved: objWithEncriptedCols
    }
}

async function getCasosList() {
    try {
        const objWithEncriptedCols = await sql.bdConnection('select', `SELECT
            CONCAT(Tbl_A_casos.nombre, '|', "freeText") AS Nombre,
            CONCAT(Tbl_flujo_especialidades.especialidad, '|', "freeText") AS Especialidad,
            CONCAT(Tbl_flujo_especialidades.subEspecialidad, '|', "freeText") AS "Sub-Especialidad",
            CONCAT(Tbl_flujo_especialidades.tipoProceso, '|', "freeText") AS "Tipo de caso",
            CONCAT_WS(' ', GROUP_CONCAT(DISTINCT Tbl_A_personas.nombre, " (", Tbl_flujo_roles.rol, ")" SEPARATOR ', '), '|', "freeText") AS "Partes del caso",
            CONCAT_WS(' ', GROUP_CONCAT(DISTINCT Tbl_A_radicadosCasos.radicadoExpendiente, " (", Tbl_A_radicadosCasos.nombreDespacho, ")" SEPARATOR ', '), '|', "freeText") AS "Radicados registrados",
            CONCAT(Tbl_A_casos.detalle, '|', "freeText") AS Detalles,
            CONCAT(Tbl_A_casos.Usuario, '|', "freeText") AS "Creado por",
            CONCAT('|', "freeButton", '|', "casoMainView btn btn-block fa-solid fa-right-to-bracket", '|', "Gestionar caso", '|', JSON_OBJECT("btnTblGhfCasoMainView", Tbl_A_casos.idCasos)) AS "Gestionar caso",
            CONCAT('|', "freeButton", '|', "openViewCargarActuacion btn btn-block fa-solid fa-scale-balanced", '|', "Agregar actuación", '|', JSON_OBJECT("btnTblGhfOpenViewCargarActuacion", Tbl_A_casos.idCasos)) AS "Agregar actuación",
            CONCAT('|', "freeButton", '|', "openViewCargarActividadParalegal btn btn-block fa-solid fa-code-branch", '|', "Agregar actividad paralegal o nota", '|', JSON_OBJECT("btnTblGhfOpenViewCargarActividadParalegal", Tbl_A_casos.idCasos)) AS "Agregar actividad paralegal o nota",
            CONCAT('|', "freeButton", '|', "openModalEliminarCaso btn btn-block fa-solid fa-trash", '|', "Eliminar caso", '|', JSON_OBJECT("btnTblGhfOpenModalEliminarCaso", Tbl_A_casos.idCasos)) AS "Eliminar caso"
        FROM
            Tbl_A_casos
        LEFT JOIN Tbl_flujo_especialidades ON Tbl_flujo_especialidades.idEspecialidades = Tbl_A_casos.idEspecialidades
        LEFT JOIN Tbl_A_gestionCasos ON Tbl_A_gestionCasos.idCasos = Tbl_A_casos.idCasos
        LEFT JOIN Tbl_A_personas ON Tbl_A_gestionCasos.idPersonas = Tbl_A_personas.idPersonas
        LEFT JOIN Tbl_flujo_roles ON Tbl_flujo_roles.idRoles = Tbl_A_gestionCasos.idRoles
        LEFT JOIN Tbl_A_radicadosCasos ON Tbl_A_radicadosCasos.idCasos = Tbl_A_casos.idCasos
        WHERE
            Tbl_A_casos.Estado = "A"
        GROUP BY
            Tbl_A_casos.idCasos`);
        // console.log(objWithEncriptedCols.resultAsObj)
        return objWithEncriptedCols;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export {
    getCasoViewForm_,
    getEspecialidadesCasos_,
    getDataForEditCasoViewForm,
    getCasosList,
}
