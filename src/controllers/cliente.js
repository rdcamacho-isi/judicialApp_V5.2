import { utilidades } from "./backend.js";
import * as sql from "./sql.js";
import * as dinamicInput from "./Tools/dinamicInput.crud.be.js";

function getClienteViewForm_() {

    const tipoIdentificacion = ghfBdConnection.api([{
        queryType: `select`, query: `SELECT
            Tbl_D_tiposIdentificacionPesonas.tipoIdentificacion AS innerHtml,
            Tbl_D_tiposIdentificacionPesonas.idTipoIdentificacion AS value
        FROM
            Tbl_D_tiposIdentificacionPesonas
        WHERE
            Tbl_D_tiposIdentificacionPesonas.Estado = "A"
        ORDER BY Tbl_D_tiposIdentificacionPesonas.tipoIdentificacion`
    }], paramsForApiBdConnection)[0][3];

    const indicativosTelefonicos = ghfBdConnection.api([{
        queryType: `select`, query: `SELECT
            CONCAT(Tbl_Dane_paises.phone_code, " - ", Tbl_Dane_paises.name) AS innerHtml,
            Tbl_Dane_paises.phone_code AS value
        FROM
            Tbl_Dane_paises
        ORDER BY Tbl_Dane_paises.phone_code `
    }], paramsForApiBdConnection)[0][3];


    return [
        {//START SELECT tipoPersona
            "label": {
                "titulo": "Tipo de persona",
                "forAttr": "tipoPersona"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": ['Natural', 'Juridica'],
                "value": ['Natural', 'Juridica']
            },
            "atributosTag": [
                { "id": "tipoPersona" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "cyrQyavkAyPxnlmYd0U4uQ==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "funcCriteria": "Natural|temp-personaNatural|box-inputEspecificosTipoPersona(-ghf-)Juridica|temp-personaJuridica|box-inputEspecificosTipoPersona" },
                { "dependenciaEazyDropDown": "no" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT
        ,
        {//START SELECT tipoIdentificacion
            "label": {
                "titulo": "Tipo de identificación",
                "forAttr": "tipoIdentificacion"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": tipoIdentificacion.innerHtml,
                "value": tipoIdentificacion.value
            },
            "atributosTag": [
                { "id": "tipoIdentificacion" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "nfvf0jbEUg3S9XJuMRkIaA==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "no" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT
        ,
        {//START INPUT numeroIdentificacion
            "label": {
                "titulo": "Numero identificación",
                "forAttr": "numeroIdentificacion"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "numeroIdentificacion" },
                { "type": "number" },
                { "required": "true" },
                { "list": "list-numeroIdentificacion" },
                { "name": "name-" },
                { "min": "0" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "EnuEgA61ma0MiNEIEZc/BA==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "numericTempGenerator": "no" },
                { "rowTitle": "no" }
            ]
        }//END INPUT  
        ,
        {//START INPUT Nombre
            "label": {
                "titulo": "Nombre",
                "forAttr": "nombreCliente"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "nombreCliente" },
                { "type": "text" },
                { "required": "true" },
                { "list": "list-nombreCliente" },
                { "name": "name-" },
                { "onkeyup": "this.value = this.value.toUpperCase();" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "Zt12HQLyfxud8pV5wDIHng==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "numericTempGenerator": "no" },
                { "rowTitle": "no" }
            ]
        }//END INPUT    
        ,
        {//START DIV
            "tipoTag": "dinamicDivGhf",
            "atributosTag": [
                { "id": "box-inputEspecificosTipoPersona" }
            ],
            "datasetTag": [
            ]
        }//END DIV
        ,
        {//START TEMPLATE personaNatural
            "tipoTag": "dinamicTemplateGhf",
            "idDestination": "form-cliente",
            "idTemp": "temp-personaNatural",
            "tags": [
                {//START INPUT apellidoCliente
                    "label": {
                        "titulo": "Apellido",
                        "forAttr": "apellidoCliente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "apellidoCliente" },
                        { "type": "text" },
                        { "required": "true" },
                        { "list": "list-apellidoCliente" },
                        { "name": "name-" },
                        { "onkeyup": "this.value = this.value.toUpperCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "V3liXeOYVU9249SxsoyKQA==" },
                        { "bdlf": "no" },
                        { "json": "no" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT     
                ,
                {//START SELECT generoCliente
                    "label": {
                        "titulo": "Genero",
                        "forAttr": "generoCliente"
                    },
                    "tipoTag": "dinamicSelectGhf",
                    "opcionesSelect": {
                        "innerHtml": ["Masculino", "Femenino"],
                        "value": ["Masculino", "Femenino"]
                    },
                    "atributosTag": [
                        { "id": "generoCliente" },
                        { "required": "true" },
                        { "name": "" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "generoCliente" },
                        { "summer": "no" },
                        { "funcCriteria": "no" },
                        { "dependenciaEazyDropDown": "no" },
                        { "selectWithSearch": "no" }
                    ]
                }//END SELECT             
            ]
        }//END TEMPLATE    
        ,
        {//START TEMPLATE personaJuridica
            "tipoTag": "dinamicTemplateGhf",
            "idDestination": "form-cliente",
            "idTemp": "temp-personaJuridica",
            "tags": [
                {//START INPUT nombreRepresentateLegal
                    "label": {
                        "titulo": "Nombre representate legal",
                        "forAttr": "nombreRepresentateLegal"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "nombreRepresentateLegal" },
                        { "type": "text" },
                        { "list": "list-nombreRepresentateLegal" },
                        { "name": "name-" },
                        { "onkeyup": "this.value = this.value.toUpperCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "nombreRepresentateLegal" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT         
                ,
                {//START INPUT nombreRepresentateLegalSuplente
                    "label": {
                        "titulo": "Nombre representate legal suplente",
                        "forAttr": "nombreRepresentateLegalSuplente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "nombreRepresentateLegalSuplente" },
                        { "type": "text" },
                        { "list": "list-nombreRepresentateLegalSuplente" },
                        { "name": "name-" },
                        { "onkeyup": "this.value = this.value.toUpperCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "nombreRepresentateLegalSuplente" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT         
                ,
                {//START INPUT paginaWebCliente
                    "label": {
                        "titulo": "Pagina Web",
                        "forAttr": "paginaWebCliente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "paginaWebCliente" },
                        { "type": "text" },
                        { "list": "list-paginaWebCliente" },
                        { "name": "name-" },
                        { "onkeyup": "this.value = this.value.toLowerCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "paginaWebCliente" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT        
            ]
        }//END TEMPLATE    
        ,
        {//START SELECT paisCliente
            "label": {
                "titulo": "País",
                "forAttr": "paisCliente"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "paisCliente" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                { "bdlf": "no" },
                { "json": "paisCliente" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "no" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT    
        ,
        {//START SELECT departamentoCliente
            "label": {
                "titulo": "Departamento/Estado",
                "forAttr": "departamentoCliente"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "departamentoCliente" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                { "bdlf": "" },
                { "json": "departamentoCliente" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "paisCliente" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT
        ,
        {//START SELECT ciudadCliente
            "label": {
                "titulo": "Ciudad/Municipio",
                "forAttr": "ciudadCliente"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "ciudadCliente" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "2i70LTJ0hFKOK+iZOiDH1A==" },
                { "bdlf": "no" },
                { "json": "no" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "paisCliente|departamentoCliente" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT    
        ,
        {//START SELECT idioma
            "label": {
                "titulo": "Idioma",
                "forAttr": "idioma"
            },
            "tipoTag": "dinamicSelectGhf",
            "opcionesSelect": {
                "innerHtml": ["Español", "Ingles"],
                "value": ["Español", "Ingles"]
            },
            "atributosTag": [
                { "id": "idioma" },
                { "required": "true" },
                { "name": "" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                { "bdlf": "no" },
                { "json": "idioma" },
                { "summer": "no" },
                { "funcCriteria": "no" },
                { "dependenciaEazyDropDown": "no" },
                { "selectWithSearch": "no" }
            ]
        }//END SELECT
        ,
        {//START INPUT totalNumeroTelefonosQueDeseaAgregar
            "label": {
                "titulo": "Numero total de telefonos para notificación que desea agregar",
                "forAttr": "totalNumeroTelefonosQueDeseaAgregar"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "totalNumeroTelefonosQueDeseaAgregar" },
                { "type": "number" },
                { "required": "true" },
                { "list": "list-totalNumeroTelefonosQueDeseaAgregar" },
                { "name": "name-totalNumeroTelefonosQueDeseaAgregar" },
                { "min": "0" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                { "bdlf": "no" },
                { "json": "totalNumeroTelefonosQueDeseaAgregar" },
                { "summer": "no" },
                { "numericTempGenerator": "si" },
                { "rowTitle": "Telefono notificación" }
            ]
        }//END INPUT  
        ,
        {//START DIV divTotalNumeroTelefonosQueDeseaAgregar
            "tipoTag": "dinamicDivGhf",
            "atributosTag": [
                { "id": "box-totalNumeroTelefonosQueDeseaAgregar" }
            ],
            "datasetTag": [
                { style: "paddingLeft,2.5%|paddingRigth,2.5%" }
            ]
        }//END DIV    
        ,
        {//START TEMPLATE
            "tipoTag": "dinamicTemplateGhf",
            "idDestination": "form-cliente",
            "idTemp": "temp-totalNumeroTelefonosQueDeseaAgregar",
            "tags": [
                {//START SELECT indicativoTelefonoCliente
                    "label": {
                        "titulo": "Indicativo",
                        "forAttr": "indicativoTelefonoCliente"
                    },
                    "tipoTag": "dinamicSelectGhf",
                    "opcionesSelect": {
                        "innerHtml": indicativosTelefonicos.innerHtml,
                        "value": indicativosTelefonicos.value
                    },
                    "atributosTag": [
                        { "id": "indicativoTelefonoCliente" },
                        { "required": "true" },
                        { "name": "name-totalNumeroTelefonosQueDeseaAgregar" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "indicativoTelefonoCliente" },
                        { "summer": "no" },
                        { "funcCriteria": "no" },
                        { "dependenciaEazyDropDown": "no" },
                        { "selectWithSearch": "no" }
                    ]
                }//END SELECT        
                ,
                {//START INPUT numeroTelefonoCliente
                    "label": {
                        "titulo": "Numero telefono cliente",
                        "forAttr": "numeroTelefonoCliente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "numeroTelefonoCliente" },
                        { "type": "number" },
                        { "required": "true" },
                        { "list": "list-numeroTelefonoCliente" },
                        { "name": "name-totalNumeroTelefonosQueDeseaAgregar" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "numeroTelefonoCliente" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT        
            ]
        }//END TEMPLATE   
        ,
        {//START INPUT totalNumeroDireccionesQueDeseaAgregar
            "label": {
                "titulo": "Numero total de direcciones para notificación que desea agregar",
                "forAttr": "totalNumeroDireccionesQueDeseaAgregar"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "totalNumeroDireccionesQueDeseaAgregar" },
                { "type": "number" },
                { "required": "true" },
                { "list": "list-totalNumeroDireccionesQueDeseaAgregar" },
                { "name": "name-totalNumeroDireccionesQueDeseaAgregar" },
                { "min": "0" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                { "bdlf": "no" },
                { "json": "totalNumeroDireccionesQueDeseaAgregar" },
                { "summer": "no" },
                { "numericTempGenerator": "si" },
                { "rowTitle": "Dirección notificación" }
            ]
        }//END INPUT  
        ,
        {//START DIV totalNumeroDireccionesQueDeseaAgregar
            "tipoTag": "dinamicDivGhf",
            "atributosTag": [
                { "id": "box-totalNumeroDireccionesQueDeseaAgregar" }
            ],
            "datasetTag": [
                { style: "paddingLeft,2.5%|paddingRigth,2.5%" }
            ]
        }//END DIV
        ,
        {//START TEMPLATE totalNumeroDireccionesQueDeseaAgregar
            "tipoTag": "dinamicTemplateGhf",
            "idDestination": "form-cliente",
            "idTemp": "temp-totalNumeroDireccionesQueDeseaAgregar",
            "tags": [
                {//START INPUT barrioCliente
                    "label": {
                        "titulo": "Barrio",
                        "forAttr": "barrioCliente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "barrioCliente" },
                        { "type": "text" },
                        { "required": "true" },
                        { "list": "list-barrioCliente" },
                        { "name": "name-totalNumeroDireccionesQueDeseaAgregar" },
                        { "onkeyup": "this.value = this.value.toUpperCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "barrioCliente" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT
                ,
                {//START INPUT direccionCliente
                    "label": {
                        "titulo": "Dirección",
                        "forAttr": "direccionCliente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "direccionCliente" },
                        { "type": "text" },
                        { "required": "true" },
                        { "list": "list-direccionCliente" },
                        { "name": "name-totalNumeroDireccionesQueDeseaAgregar" },
                        { "onkeyup": "this.value = this.value.toUpperCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "direccionCliente" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT                        
            ]
        }//END TEMPLATE  
        ,
        {//START INPUT totalNumeroMailQueDeseaAgregar
            "label": {
                "titulo": "Numero total de correos electrónico para notificación que desea agregar",
                "forAttr": "totalNumeroMailQueDeseaAgregar"
            },
            "tipoTag": "dinamicInputGhf",
            "datalist": {
                "innerHtml": [],
                "value": []
            },
            "atributosTag": [
                { "id": "totalNumeroMailQueDeseaAgregar" },
                { "type": "number" },
                { "required": "true" },
                { "list": "list-totalNumeroMailQueDeseaAgregar" },
                { "name": "name-totalNumeroMailQueDeseaAgregar" },
                { "min": "0" }
            ],
            "datasetTag": [
                { "form": "cliente" },
                { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                { "bdlf": "no" },
                { "json": "totalNumeroMailQueDeseaAgregar" },
                { "summer": "no" },
                { "numericTempGenerator": "si" },
                { "rowTitle": "Correo electrónico notificación" }
            ]
        }//END INPUT  
        ,
        {//START DIV totalNumeroMailQueDeseaAgregar
            "tipoTag": "dinamicDivGhf",
            "atributosTag": [
                { "id": "box-totalNumeroMailQueDeseaAgregar" }
            ],
            "datasetTag": [
                { style: "paddingLeft,2.5%|paddingRigth,2.5%" }
            ]
        }//END DIV
        ,
        {//START TEMPLATE totalNumeroMailQueDeseaAgregar
            "tipoTag": "dinamicTemplateGhf",
            "idDestination": "form-cliente",
            "idTemp": "temp-totalNumeroMailQueDeseaAgregar",
            "tags": [
                {//START INPUT correoElectronicoCliente
                    "label": {
                        "titulo": "Correo electrónico",
                        "forAttr": "correoElectronicoCliente"
                    },
                    "tipoTag": "dinamicInputGhf",
                    "datalist": {
                        "innerHtml": [],
                        "value": []
                    },
                    "atributosTag": [
                        { "id": "correoElectronicoCliente" },
                        { "type": "email" },
                        { "required": "true" },
                        { "list": "list-correoElectronicoCliente" },
                        { "name": "name-totalNumeroMailQueDeseaAgregar" },
                        { "onkeyup": "this.value = this.value.toLowerCase();" }
                    ],
                    "datasetTag": [
                        { "form": "cliente" },
                        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
                        { "bdlf": "no" },
                        { "json": "correoElectronicoCliente" },
                        { "summer": "no" },
                        { "numericTempGenerator": "no" },
                        { "rowTitle": "no" }
                    ]
                }//END INPUT               
            ]
        }//END TEMPLATE
    ]
}

async function getDatosGeograficos_() {
    const r = await sql.bdConnection('select', `SELECT
    Tbl_Dane_paises.name AS pais,
    Tbl_Dane_departamentos.nombre AS departamento,
    CONCAT(Tbl_Dane_municipios.nombre,"|",Tbl_Dane_municipios.idMunicipio) AS municipio
    FROM
        Tbl_Dane_paises
    LEFT JOIN Tbl_Dane_departamentos ON Tbl_Dane_departamentos.idPais = Tbl_Dane_paises.idPais
    LEFT JOIN Tbl_Dane_municipios ON Tbl_Dane_municipios.idDepartamento = Tbl_Dane_departamentos.idDepartamento`)

    return r.resultAsTwoDimesionalArr;
}

export {
    getClienteViewForm_,
    getDatosGeograficos_,
}