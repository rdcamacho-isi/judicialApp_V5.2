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

export {
    getCasoViewForm_,
    getEspecialidadesCasos_
}
