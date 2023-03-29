console.clear();
import { createPool } from "mysql";
import { delay } from "./utilidades.js";

// Funcion generica para establecer conexion a la BD
/**
 * @param {string} queryType - queryType: se debe indicar su es un "select", "update" o "insert"
 * @param {string} SQLstatement - SQLstatement: debe incluir una sentencia SQL valida
 *
 * @descripción Establecer conexion a la BD
 *
 * @Resultados
 * - resultAsObj: Devuelve una matriz con objetos por cada fila [0]
 * - resultAsTwoDimesionalArr: Devuelve las filas en una matriz bidimensional
 * - resultAsArrPerCol: Devuelve una matriz por cada columna [3]
 * - colNames: Devuelve los nombres de las columnas
 */

async function bdConnection(queryType, SQLstatement) {
  const connection = (queryType, SQLstatement) => {

    return new Promise((resolve, reject) => {
      // Objeto de conexion a la BD
      let poolBdConnection = createPool({
        host: "rubendb.mysql.database.azure.com",
        user: "rubenbd",
        password: "nYsqCfeLR67aCLD",
        database: "soyisipa_vigilanciajudicial",
        // host: "15.235.65.10",
        // user: "soyisipa_usuarioVJ",
        // password: "K@EjcObp7+~.",
        // database: "soyisipa_vigilanciaJudicial",
      });
      // const sql = `SELECT * FROM tblUrlSitios`;
      const sql = SQLstatement;

      const testBd = poolBdConnection.query(
        sql,
        async (error, results, fields) => {
          if (error) {

            reject(error);
            poolBdConnection.end();
          } else {
            console.log("BD exitosa");
            if (
              ["select", "update", "insert", "delete"].indexOf(queryType) == -1
            )
              throw "Debe definir que tipo de consulta: 'select', 'update', 'insert','delete'";

            //Se obtienen los nombres de las columnas de la base de datos
            let colNamesArr = [];
            let colNamesObj = {};
            let resultAsTwoDimesionalArr = [];
            if (queryType == "select") {
              fields.forEach((field) => {
                colNamesArr.push(field.name);
                colNamesObj[field.name] = [];
              });

              //El resultado como matriz bidimensional y crea objeto cuya llava es el nombre de la columna y valor es una matriz con los resulatados de la consulta

              results.forEach((obj) => {
                let row = [];
                Object.keys(obj).forEach((key) => {
                  row.push(obj[key]);
                  colNamesObj[key].push(obj[key]);
                });
                resultAsTwoDimesionalArr.push(row);
              });
            }

            resolve({
              resultAsObj: results,
              resultAsTwoDimesionalArr,
              resultAsArrPerCol: colNamesObj,
              colNames: colNamesArr,
            });
            poolBdConnection.end();
            // console.log('The solution is: ', results);
          }
        }
      );
    });
  };
  let err = false;
  let intentos = 0
  let message = ''
  return new Promise(async (resolve, reject) => {
    do {
    err = false;
    try {
      const resp = await connection(queryType, SQLstatement);
      resolve(resp)
    } catch (error) {
      message = error.message 
      console.log(error.message);
      err = true;
      await delay(10000)
    }
    intentos++
    } while (err && intentos <= 5 && message.includes('TIMEDOUT') );
    if(intentos == 5){
      reject(message)
    }
  });
}

// Funcion para la insercion masiva de datos a la BD,
// El parametro opcion se activa si es necesario dejar algun campo en NULL en BD
const bdConectionMasiveSqlInsert = async (
  arrOfData,
  sqlStatementNoValues,
  maxValuesForSql,
  opcion = false
) => {
  var arrWithSqlFormat = [];
  if (arrOfData[0].length == 1) {
    arrOfData.forEach((r) => {
      var row = [];
      r.forEach((c, index) => {
        row.push("('" + c + "')");
      });
      arrWithSqlFormat.push(row);
    });
  } else {
    arrOfData.forEach((r, indexData) => {
      var row = [];
      r.forEach((c, index) => {
        if (index == 0) {
          row.push("('" + c + "'");
        } else if (index == arrOfData[indexData].length - 1) {
          row.push("'" + c + "')");
        } else {
          row.push("'" + c + "'");
        }
      });
      arrWithSqlFormat.push(row);
    });
  }

  const test = [];
  if (opcion) {
    const statement = sqlStatementNoValues;
    const a = statement.split(",");

    let subGroupMenorSql = [];
    let subGroupSql = [];

    //   Divide en dos el array
    for (let i = 0; i < arrWithSqlFormat.length; i++) {
      if (arrWithSqlFormat[i].length == a.length) {
        subGroupSql.push(arrWithSqlFormat[i]);
      } else {
        subGroupMenorSql.push(arrWithSqlFormat[i]);
      }
    }

    var arraysNeeded1 = Math.ceil(subGroupMenorSql.length / maxValuesForSql);
    var arraysNeeded2 = Math.ceil(subGroupSql.length / maxValuesForSql);

    var grupos = [];
    var subGroupMenor = [];

    for (var i = 1; i <= arraysNeeded2; i++) {
      grupos.push([]);
      var maxRow = maxValuesForSql * i;
      subGroupSql.forEach(function (r, index) {
        if (index >= maxRow - maxValuesForSql && index < maxRow) {
          grupos[i - 1].push(r);
        }
      });
    }
    for (var i = 1; i <= arraysNeeded1; i++) {
      subGroupMenor.push([]);
      var maxRow = maxValuesForSql * i;
      subGroupMenorSql.forEach(function (r, index) {
        if (index >= maxRow - maxValuesForSql && index < maxRow) {
          subGroupMenor[i - 1].push(r);
        }
      });
    }

    const bdPromise1 = grupos.map(async (grupo, index) => {
      var valuesToQuery = grupo.join();
      var SQLstatement = sqlStatementNoValues.replace("{rows}", valuesToQuery);

      const queryResult = await bdConnection("insert", SQLstatement);
      // console.log(queryResult);
    });
    await Promise.allSettled(bdPromise1);
    console.log(
      "------------------------Espera la BD---------------------------------"
    );

    const bdPromise2 = subGroupMenor.map(async (grupo, index) => {
      const statement = sqlStatementNoValues;
      const a = statement.split(",");
      a.splice(4, 1);
      const b = a.join(",").toString().replace(/\n/g, "");
      var valuesToQuery = grupo.join();
      var SQLstatement = b.replace("{rows}", valuesToQuery);
      const queryResult = await bdConnection("insert", SQLstatement);
      return queryResult;
    });

    await Promise.allSettled(bdPromise2);
  } else {
    var grupos = [];
    var arraysNeeded = Math.ceil(arrWithSqlFormat.length / maxValuesForSql);
    for (var i = 1; i <= arraysNeeded; i++) {
      grupos.push([]);
      var maxRow = maxValuesForSql * i;
      arrWithSqlFormat.forEach(function (r, index) {
        if (index >= maxRow - maxValuesForSql && index < maxRow) {
          grupos[i - 1].push(r);
        }
      });
    }
    let result = [];
    for (const grupo of grupos) {
      var valuesToQuery = grupo.join();
      var SQLstatement = sqlStatementNoValues.replace("{rows}", valuesToQuery);
      const queryResult = await bdConnection("insert", SQLstatement);
      // console.log({resultx: queryResult})
      result.push(queryResult);
    }
    return result;
  }

  // return test
};




export { bdConnection, bdConectionMasiveSqlInsert };
