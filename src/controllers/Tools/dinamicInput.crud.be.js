import * as sql from "../sql.js";

/**
 * el objeto que se va a pasar debe venir del front end y se debe ver parecido al ej:
   var obj = {
    "1ehPn6fnD/NXyY9YYmictg==": "BAJO",
    "3i0Jkxm8Cfqp0WxHXMvQUA==": "1",
    "7w7+syzJ/ji183UZC3W/FA==": "FALLA",
    "cGXB1apMwwkUY+BU23i7rw==(-ghf-)pLklx/nFqOwe6ks8r60/6w==": "552"
  }
 * La ultima opción tiene (-ghf-), eso quiere decir que el mismo valor va a dos tablas distintas
 */


async function selectEncriptedObjInBd(obj, whereCriteria) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    whereCriteria = typeof whereCriteria == "undefined" ? "" : whereCriteria;
    let tblNamesObj, objToWork, joinsSql = [], keysToReplaceInQuery = [[], []];

    for (const subKeys of Object.keys(obj)) {
        if (subKeys == "keysBd") {
            tblNamesObj = await buildObjFromEncriptedData(obj[subKeys]);
        }
        if (subKeys == "joins") {
            objToWork = await buildObjFromEncriptedData(obj[subKeys]);

            let indexJ = 0;

            for (const keyDataForJoin of Object.keys(objToWork.dataForJoins)) {
                const cols = objToWork.dataForJoins[keyDataForJoin].split("(-ghf-)");
                const tblOrigen = cols[0].split(".")[0]
                let joinPart = `LEFT JOIN ${tblOrigen} ${alphabet[indexJ]} ON ${alphabet[indexJ] + "." + cols[0].split(".")[1]} = ${cols[2]}`;
                keysToReplaceInQuery[0].push(cols[2]);
                keysToReplaceInQuery[1].push(alphabet[indexJ] + "." + cols[1].split(".")[1]);
                if (joinsSql.indexOf(joinPart) == -1) {
                    joinsSql.push(joinPart);
                }
                indexJ++
            }
        }
    }

    let sqlStatement;
    if (joinsSql.length > 0) {
        let colNamesWithJoinData = [];
        joinsSql = joinsSql.join(" ");
        tblNamesObj.colNames[0].forEach(colName => {
            if (keysToReplaceInQuery[0].indexOf(colName) > -1) {
                const indexOfIntrest = keysToReplaceInQuery[0].indexOf(colName);
                colNamesWithJoinData.push(`${keysToReplaceInQuery[1][indexOfIntrest]} AS "${keysToReplaceInQuery[0][indexOfIntrest].split(".")[1]}"`);
            } else {
                colNamesWithJoinData.push(colName)
            }
        });
        sqlStatement = `SELECT ${colNamesWithJoinData.join(",")} FROM ${tblNamesObj.tblNames[0]} ${joinsSql} ${whereCriteria}`;
    } else {
        sqlStatement = `SELECT ${tblNamesObj.colNames[0].join(",")} FROM ${tblNamesObj.tblNames[0]} ${whereCriteria}`;
    }

    const test = await sql.bdConnection('select', sqlStatement);

    return encriptColKeys(test, tblNamesObj.tblNames[0]);
}


async function insertEncriptedObjInBd(obj, user, valueToUpdate) {
    const tblNamesObj = await buildObjFromEncriptedData(obj.obj);
    const result = [];
    const resultDetail = [];
    let i = 0;
    for (const tblName of tblNamesObj.tblNames) {
        const sqlStatement = `INSERT INTO ${tblName} (${tblNamesObj.colNames[i].join(",")}) VALUES('${tblNamesObj.values[i].join("','")}')`;
        console.log(sqlStatement)

        const sqlStatementLog = `INSERT INTO Tbl_0_log (queryType, obj, idUpdated, Usuario) VALUES ("INSERT", '${JSON.stringify(obj)}', "${valueToUpdate}", "${user}")`;

        const test1 = await sql.bdConnection('insert', sqlStatement);
        const test2 = await sql.bdConnection('insert', sqlStatementLog);

        result.push(test1);
        console.log({ test1 });
        resultDetail.push(test2);
        console.log({ test2 });
        i++
    }

    const val = result.every(r => {
        return r != -1
    });

    let comentarioError = "error: al menos 1 acción no fue realizada";
    if (val == false) {
        switch (true) {
            case resultDetail[0].substring(0, 15) == "Duplicate entry":
                let regExp = new RegExp("'(.*?)'");
                let id = regExp.exec(resultDetail[0]);
                comentarioError = "Registro no creado, la identificación " + id[0] + " ya se encuentra en la base de datos."
                break;
            default:
        }
    }


    return val == false ? ["mal", comentarioError] : ["ok"];
}

async function updateEncriptedObjInBd(obj, keyToUpdate, valueToUpdate, user) {

    const tblNamesObj = await buildObjFromEncriptedData(obj.colsToUpdate);
    const result = [];
    keyToUpdate = Object.entries(tblNamesObj.dataForJoins).filter(r => { return r[0] == keyToUpdate })[0][1];
    let i = 0;
    for (const tblName of tblNamesObj.tblNames) {
        let dataToUpdateArr = [];
        tblNamesObj.colNames[i].forEach((colNames, index) => {
            if (keyToUpdate != colNames) {
                dataToUpdateArr.push(`${colNames} = '${tblNamesObj.values[i][index]}'`);
            }
        });
        const sqlStatement = `UPDATE ${tblName} SET ${dataToUpdateArr.join(",")}  WHERE ${keyToUpdate} = "${valueToUpdate}"`;
        const sqlStatementLog = `INSERT INTO Tbl_0_log (queryType, obj, idUpdated, Usuario) VALUES ("UPDATE", '${JSON.stringify(obj)}',"${valueToUpdate}", "${user}")`;

        const test1 = await sql.bdConnection('update', sqlStatement);
        const test2 = await sql.bdConnection('insert', sqlStatementLog);

        result.push(test1);
        console.log(test1);
        i++;
    }

    const val = result.every(r => {
        return r != -1
    });

    return val == false ? "error: al menos 1 acción no fue realizada" : "ok";
}

async function buildObjFromEncriptedData(obj) {
    let arrEncriptedColNames = [];
    Object.keys(obj).forEach(rawKey => {
        const objKey = rawKey.split("(-ghf-)");
        objKey.forEach(key => {
            arrEncriptedColNames.push(key);
        });
    });

    arrEncriptedColNames = arrEncriptedColNames.join('","');

    let bdCols = await sql.bdConnection('select', `SELECT
                tbl_0_nombreColsEncriptado.nombreCol,
                tbl_0_nombreColsEncriptado.nombreColEncriptado
            FROM
                tbl_0_nombreColsEncriptado
            WHERE
                tbl_0_nombreColsEncriptado.nombreColEncriptado IN ("${arrEncriptedColNames}")`);

    bdCols = bdCols.resultAsArrPerCol;


    let dataForJoins = {};
    Object.keys(obj).forEach(rawKey => {
        let desencriptedKeysForJoin = [];
        const objKey = rawKey.split("(-ghf-)");
        objKey.forEach(key => {
            desencriptedKeysForJoin.push(bdCols.nombreCol[bdCols.nombreColEncriptado.indexOf(key)]);
        });
        dataForJoins[rawKey] = desencriptedKeysForJoin.join("(-ghf-)");
    });

    let tblNamesObj = { tblNames: [], colNames: [], values: [], dataForJoins };

    Object.keys(obj).forEach((rawKey, i) => {
        const objKey = rawKey.split("(-ghf-)");
        const objValue = obj[rawKey];
        objKey.forEach((key, i) => {
            const indexColName = bdCols.nombreColEncriptado.indexOf(key);
            if (tblNamesObj.tblNames.indexOf(bdCols.nombreCol[indexColName].split(".")[0]) == -1) {
                tblNamesObj.tblNames.push(bdCols.nombreCol[indexColName].split(".")[0]);
                tblNamesObj.colNames.push([]);
                tblNamesObj.values.push([]);
            }
            const colName = bdCols.nombreCol[indexColName].split(".")[0];
            const selectArray = tblNamesObj.tblNames.indexOf(colName);
            tblNamesObj.colNames[selectArray].push(bdCols.nombreCol[indexColName]);
            obj[key] = typeof objValue === 'object' ? JSON.stringify(objValue) : objValue;
            tblNamesObj.values[selectArray].push(obj[key]);
        });
    });
    return tblNamesObj;
}

async function encriptColKeys(query, tblName) {
    let colNames = [];
    query.colNames.forEach(colName => {
        colNames.push(tblName + "." + colName);
    });

    colNames = colNames.join('","');


    let bdCols = await sql.bdConnection('select', `SELECT
    tbl_0_nombreColsEncriptado.nombreCol,
    tbl_0_nombreColsEncriptado.nombreColEncriptado
FROM
    tbl_0_nombreColsEncriptado
WHERE
    tbl_0_nombreColsEncriptado.nombreCol IN ("${colNames}")`);

    bdCols = bdCols.resultAsArrPerCol;

    let objWithColsEncripted = {};

    for (const obj of query.resultAsObj) {
        Object.keys(obj).forEach(key => {
            const colIndex = bdCols.nombreCol.indexOf(tblName + "." + key);
            objWithColsEncripted[bdCols.nombreColEncriptado[colIndex]] = obj[key];
        });
    }

    return objWithColsEncripted
}


export {
    insertEncriptedObjInBd,
    selectEncriptedObjInBd,
    updateEncriptedObjInBd
}