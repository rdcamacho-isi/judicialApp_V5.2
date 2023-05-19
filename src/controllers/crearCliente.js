import { utilidades } from "./backend.js";
import * as sql from "./sql.js";
import * as dinamicInput from "./Tools/dinamicInput.crud.be.js";


async function getDataForEditClienteViewForm_(criteriosFrontEnd) {
  //var criteriosFrontEnd = {"sesion":"z-r8y0djtzcj_1653560613482","id":"cliente-eags1xeu4w_mjc9db2dh8"};
  // var criteriosFrontEnd = JSON.parse(e);

  // persona-4050azkj_qjzply5p 

  // console.log({criteriosFrontEnd});

  let objWithEncriptedCols = await sql.bdConnection('select', `SELECT
      Tbl_0_log.idLog AS id,
      Tbl_0_log.obj,
      Tbl_0_log.idUpdated
    FROM
      Tbl_0_log
    WHERE
      Tbl_0_log.idUpdated = "${criteriosFrontEnd.id}"
    ORDER BY
      Tbl_0_log.FechaRegistro
    DESC
    LIMIT 1;`);

  objWithEncriptedCols = objWithEncriptedCols.resultAsObj;

  console.log({ objWithEncriptedCols });

  console.log({ validaEsto: objWithEncriptedCols[0]["obj"] });

  objWithEncriptedCols = JSON.parse(utilidades.fixJson(objWithEncriptedCols[0]["obj"]))//Esta linea es necesaria para solucionar saltos de linea y tab spaces en summer note y text area
  objWithEncriptedCols["keysBd"] = objWithEncriptedCols.obj;


  var whereCriteria = `WHERE Tbl_A_personas.idPersonas = "${criteriosFrontEnd.id}"`;

  return {
    keyAndValues: JSON.stringify(dinamicInput.selectEncriptedObjInBd(objWithEncriptedCols, whereCriteria)),
    lastFormSaved: objWithEncriptedCols
  }

}

async function getClienteViewForm_() {
  let promises = [];

  const tipoIdentificacionQuery = sql.bdConnection('select', `SELECT
            Tbl_D_tiposIdentificacionPesonas.tipoIdentificacion AS innerHtml,
            Tbl_D_tiposIdentificacionPesonas.idTipoIdentificacion AS value
        FROM
            Tbl_D_tiposIdentificacionPesonas
        WHERE
            Tbl_D_tiposIdentificacionPesonas.Estado = "A"
        ORDER BY Tbl_D_tiposIdentificacionPesonas.tipoIdentificacion`);

  promises.push(tipoIdentificacionQuery);

  const tiendasQuery = sql.bdConnection('select', `SELECT 
        CONCAT(Tbl_A_personas.numeroIdentificacion, " - ", Tbl_A_personas.nombre) AS innerHtml,
        Tbl_A_personas.idPersonas AS value
      FROM
        Tbl_A_personas
      WHERE
        Tbl_A_personas.tipoPersona = "Store"`);

  promises.push(tiendasQuery);

  const response = await Promise.all(promises);

  const tipoIdentificacion = response[0].resultAsArrPerCol;
  const tiendas = response[1].resultAsArrPerCol;

  return [
    {//START SELECT tipoPersona
      "label": {
        "titulo": "Type of collaborator",
        "forAttr": "tipoPersona"
      },
      "tipoTag": "dinamicSelectGhf",
      "opcionesSelect": {
        "innerHtml": ['Agent', 'Store'],
        "value": ['Agent', 'Store']
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
        { "funcCriteria": "Agent|temp-personaNatural|box-inputEspecificosTipoPersona(-ghf-)Store|temp-personaJuridica|box-inputEspecificosTipoPersona" },
        { "dependenciaEazyDropDown": "no" },
        { "selectWithSearch": "no" }
      ]
    }//END SELECT
    ,
    {//START INPUT numeroIdentificacion
      "label": {
        "titulo": "Id in ASA betting software",
        "forAttr": "idAsaBettingSoftware"
      },
      "tipoTag": "dinamicInputGhf",
      "datalist": {
        "innerHtml": [],
        "value": []
      },
      "atributosTag": [
        { "id": "idAsaBettingSoftware" },
        { "type": "text" },
        { "required": "true" },
        { "list": "list-idAsaBettingSoftware" },
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
        "titulo": "Name",
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
            "titulo": "Last name",
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
            "titulo": "Gender",
            "forAttr": "generoCliente"
          },
          "tipoTag": "dinamicSelectGhf",
          "opcionesSelect": {
            "innerHtml": ["Male", "Female"],
            "value": ["Male", "Female"]
          },
          "atributosTag": [
            { "id": "generoCliente" },
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
            "titulo": "Owner's name",
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
        }//END INPUT,
        ,
        {//START INPUT numberOtherStoresToAssociate
          "label": {
            "titulo": "If you want to associate other stores to this agent, please indicate how many",
            "forAttr": "numberOtherStoresToAssociate"
          },
          "tipoTag": "dinamicInputGhf",
          "datalist": {
            "innerHtml": [],
            "value": []
          },
          "atributosTag": [
            { "id": "numberOtherStoresToAssociate" },
            { "type": "number" },
            { "required": "true" },
            { "list": "list-numberOtherStoresToAssociate" },
            { "name": "name-numberOtherStoresToAssociate" },
            { "min": "0" }
          ],
          "datasetTag": [
            { "form": "cliente" },
            { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
            { "bdlf": "no" },
            { "json": "numberOtherStoresToAssociate" },
            { "summer": "no" },
            { "numericTempGenerator": "si" },
            { "rowTitle": "Dependent store" }
          ]
        }//END INPUT
        ,
        {//START DIV numberOtherStoresToAssociate
          "tipoTag": "dinamicDivGhf",
          "atributosTag": [
            { "id": "box-numberOtherStoresToAssociate" }
          ],
          "datasetTag": [
            { style: "paddingLeft,2.5%|paddingRigth,2.5%" }
          ]
        }//END DIV     

      ]
    }//END TEMPLATE    
    ,
    {//START TEMPLATE numberOtherStoresToAssociate
      "tipoTag": "dinamicTemplateGhf",
      "idDestination": "form-cliente",
      "idTemp": "temp-numberOtherStoresToAssociate",
      "tags": [
        {//START SELECT StoreToAssociate
          "label": {
            "titulo": "Select the store you want to associate",
            "forAttr": "StoreToAssociate"
          },
          "tipoTag": "dinamicSelectGhf",
          "opcionesSelect": {
            "innerHtml": tiendas.innerHtml,
            "value": tiendas.value
          },
          "atributosTag": [
            { "id": "StoreToAssociate" },
            { "required": "true" },
            { "name": "name-StoreToAssociate" }
          ],
          "datasetTag": [
            { "form": "cliente" },
            { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
            { "bdlf": "no" },
            { "json": "StoreToAssociate" },
            { "summer": "no" },
            { "funcCriteria": "no" },
            { "dependenciaEazyDropDown": "no" },
            { "selectWithSearch": "no" }
          ]
        }//END SELECT        
      ]
    }//END TEMPLATE       
    ,
    {//START INPUT totalNumeroTelefonosQueDeseaAgregar
      "label": {
        "titulo": "How many cell or phone numbers do you want to add?",
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
        { "rowTitle": "Phone" }
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
            "titulo": "Type",
            "forAttr": "indicativoTelefonoCliente"
          },
          "tipoTag": "dinamicSelectGhf",
          "opcionesSelect": {
            "innerHtml": ['Home', 'Work', 'Other'],
            "value": ['Home', 'Work', 'Other']
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
            "titulo": "Number",
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
    {//START INPUT totalNumeroMailQueDeseaAgregar
      "label": {
        "titulo": "How many emails do you want to add?",
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
        { "min": "1" }
      ],
      "datasetTag": [
        { "form": "cliente" },
        { "cbd": "VgaSiNrAy7C1gYlw9JgkLw==" },
        { "bdlf": "no" },
        { "json": "totalNumeroMailQueDeseaAgregar" },
        { "summer": "no" },
        { "numericTempGenerator": "si" },
        { "rowTitle": "Email" }
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
            "titulo": "email",
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
    LEFT JOIN Tbl_Dane_municipios ON Tbl_Dane_municipios.idDepartamento = Tbl_Dane_departamentos.idDepartamento`);

  return r.resultAsTwoDimesionalArr
}



export {
  getClienteViewForm_,
  getDatosGeograficos_,
  getDataForEditClienteViewForm_,
}