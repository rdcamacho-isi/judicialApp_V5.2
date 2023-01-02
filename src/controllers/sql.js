console.clear();
import { createPool } from "mysql";

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

const bdConnection = (queryType, SQLstatement) => {
    // Objeto de conexion a la BD
    let poolBdConnection = createPool({
        host: "93.188.166.162",
        database: "veleztru_gestion_documental",
        user: "veleztru_admin",
        password: "R)EqIR&Oe@Ew",
    });

    return new Promise((resolve, reject) => {
        // const sql = `SELECT * FROM tblUrlSitios`;
        const sql = SQLstatement;
        const testBd = poolBdConnection.query(
            sql,
            async (error, results, fields) => {
                console.log("***********************************************");
                if (error) throw error;
                if (['select', 'update', 'insert'].indexOf(queryType) == -1) throw "Debe definir que tipo de consulta: 'select', 'update', 'insert'";

                //Se obtienen los nombres de las columnas de la base de datos
                let colNamesArr = [];
                let colNamesObj = {};
                let resultAsTwoDimesionalArr = [];
                if (queryType == "select") {
                    fields.forEach(field => {
                        colNamesArr.push(field.name);
                        colNamesObj[field.name] = [];
                    });

                    //El resultado como matriz bidimensional y crea objeto cuya llava es el nombre de la columna y valor es una matriz con los resulatados de la consulta

                    results.forEach(obj => {
                        let row = [];
                        Object.keys(obj).forEach(key => {
                            row.push(obj[key]);
                            colNamesObj[key].push(obj[key])
                        });
                        resultAsTwoDimesionalArr.push(row);
                    });
                }

                resolve({
                    resultAsObj: results,
                    resultAsTwoDimesionalArr,
                    resultAsArrPerCol: colNamesObj,
                    colNames: colNamesArr
                });
                poolBdConnection.end();
                // console.log('The solution is: ', results);
            }
        );
    });
};

// Funcion para la insercion masiva de datos a la BD
const bdConectionMasiveSqlInsert = (arrOfData, sqlStatementNoValues, maxValuesForSql) => {
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
        arrOfData.forEach((r) => {
            var row = [];
            r.forEach((c, index) => {
                if (index == 0) {
                    row.push("('" + c + "'");
                } else if (index == arrOfData[0].length - 1) {
                    row.push("'" + c + "')");
                } else {
                    row.push("'" + c + "'");
                }
            });
            arrWithSqlFormat.push(row);
        });
    }

    var arraysNeeded = Math.ceil(arrWithSqlFormat.length / maxValuesForSql);
    var grupos = [];

    for (var i = 1; i <= arraysNeeded; i++) {
        grupos.push([]);
        var maxRow = maxValuesForSql * i;
        arrWithSqlFormat.forEach(function (r, index) {
            if (index >= maxRow - maxValuesForSql && index < maxRow) {
                grupos[i - 1].push(r);
            }
        });
    }

    const test = [];

    grupos.forEach(async (grupo, index) => {
        var valuesToQuery = grupo.join();
        var SQLstatement = sqlStatementNoValues.replace("{rows}", valuesToQuery);
        const queryResult = await bdConnection("insert", SQLstatement);
        console.log(queryResult);
    });

    // return test
}

// const testBdConnectionm = async () => {
//     const casa = await bdConnection("insert", `SELECT * FROM Tbl_Usuario`);

//     console.log(casa);

// }

// testBdConnectionm();


// const testMasveUpdate = async () => {

//     const arrOfData  = [["test",6],["test",6565],["test",7878]];
//     const sqlStatementNoValues = `INSERT INTO Tbl_Usuario(Username, Id_Sucursal)
//                                     VALUES {rows}`;
//     const maxValuesForSql = 3;                                

//     const casa = bdConectionMasiveSqlInsert (arrOfData,sqlStatementNoValues,maxValuesForSql)

//     console.log(casa);

// }

// testMasveUpdate();


export {
    bdConnection,
    bdConectionMasiveSqlInsert
};