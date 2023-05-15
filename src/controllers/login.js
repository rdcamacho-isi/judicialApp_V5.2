import crypto from "crypto";
import * as sql from "./sql.js";
import * as utilidadesIsi from "./utilidades.js";




const closeLogin = async (sesion, trigger) => {
  //busca sesiones abiertas de este usuario
  let r3 = await sql.bdConnection("select", `SELECT
              Tbl_0_Sesiones.sesion
            FROM
              Tbl_0_Sesiones
            WHERE
            Tbl_0_Sesiones.Estado = "A" AND Tbl_0_Sesiones.sesion = "${sesion}"`);
  //busca sesiones abiertas de este usuario
  if (trigger == "time" && r3.resultAsArrPerCol.sesion.length == 0) {
    return "1";
  } else if (trigger == "click" && r3.resultAsArrPerCol.sesion.length > 0) {
    //cerrar sesion en base de datos
    await sql.bdConnection("update", `UPDATE
              Tbl_0_Sesiones
            SET
              Tbl_0_Sesiones.Estado = "I"
            WHERE
              Tbl_0_Sesiones.sesion = "${sesion}"`);
    return "1";
    //cerrar sesion en base de datos
  }else{
    return "0"
  }
}

const loginAndCloseOtherSesions = async (user, password) => {
  //user = "Jua peres"
  // password = "colombia125"//ghfconsultor
  //encripta clave
  const md5 = crypto.createHash("md5");
  const passwordMD5 = md5.update(password).digest('base64');


  //encripta clave
  //busca clave y usuario en base de datos
  const r = await sql.bdConnection("select", `SELECT
              A.password
            FROM
              Tbl_0_Users A
            WHERE
              A.Estado = "A" AND A.user = "${user}" AND A.password = "${passwordMD5}"`)

  //busca clave y usuario en base de datos
  //condicion que revisa si el usuario y clave existen en base de datos
  if (typeof r.resultAsArrPerCol.password[0] == "undefined") {
    return "no"
  } else {
    //busca sesiones abiertas de este usuario

    let r3 = await sql.bdConnection("select", `SELECT
                Tbl_0_Sesiones.sesion
              FROM
                Tbl_0_Sesiones
              WHERE
              Tbl_0_Sesiones.Estado = "A" AND Tbl_0_Sesiones.user = "${user}"`);
    r3 = "'" + r3.resultAsArrPerCol.sesion.join("','") + "'";
    //busca sesiones abiertas de este usuario
    //inactivar todas las sesiones abiertas
    await sql.bdConnection("update", `UPDATE
           Tbl_0_Sesiones
          SET
            Tbl_0_Sesiones.Estado = "I"
          WHERE
            Tbl_0_Sesiones.sesion IN(${r3})`);
    //inactivar todas las sesiones abiertas
    //genera codigo sesion
    const today = new Date();
    const todayNum = today.getTime();
    const codSesion = utilidadesIsi.generateId() + "_" + todayNum;
    //genera codigo sesion
    await sql.bdConnection("insert", `INSERT INTO Tbl_0_Sesiones (sesion, user, Usuario) 
                            VALUES ("${codSesion}", "${user}", "${user}");`);
    return codSesion
  }
}

const login = async (user, password) => {

  //encripta clave
  const md5 = crypto.createHash("md5");
  const passwordMD5 = md5.update(password).digest('base64');  
  
  //encripta clave
  //busca clave y usuario en base de datos
  const r = await sql.bdConnection("select", `SELECT
              A.password
            FROM
              Tbl_0_Users A
            WHERE
              A.Estado = "A" AND A.user = "${user}" AND A.password = "${passwordMD5}"`);


  //busca clave y usuario en base de datos
  //condicion que revisa si el usuario y clave existen en base de datos
  if (typeof r.resultAsArrPerCol.password[0] == "undefined") {
    return "no"
  } else {
    //busca sesiones abiertas de este usuario
    const r3 = await sql.bdConnection("select", `SELECT
                  Tbl_0_Sesiones.sesion
                FROM
                  Tbl_0_Sesiones
                WHERE
                Tbl_0_Sesiones.Estado = "A" AND Tbl_0_Sesiones.user = "${user}"`); 
    //busca sesiones abiertas de este usuario
    if (typeof r3.resultAsArrPerCol.sesion[0] == "undefined") {
      //genera codigo sesion
      const today = new Date();
      const todayNum = today.getTime();
      const codSesion = utilidadesIsi.generateId() + "_" + todayNum;
      //genera codigo sesion
      const r3 = await sql.bdConnection("insert", `INSERT INTO Tbl_0_Sesiones (sesion, user, Usuario) 
                  VALUES ("${codSesion}", "${user}", "${user}");`);  
      return codSesion
    } else {
      return "otros"
    }
  }
  //condicion que revisa si el usuario y clave existen en base de datos
}

const changePassword = async (newPassData) => {
  const obj = JSON.parse(newPassData);
  const md5 = crypto.createHash("md5");
  const passwordMD5 = md5.update(obj.currentPassword).digest('base64');


  let res = await sql.bdConnection("select", `SELECT 
              password 
            from 
              Tbl_0_Users 
            WHERE user = '${obj.user}' AND password = "${passwordMD5}"`);

 
  if (res.resultAsArrPerCol.password.length > 0) {
    const newPasswordHash = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, obj.newPassword));
    
    res = await sql.bdConnection("update", `UPDATE 
                            Tbl_0_Users 
                          SET 
                            password = "${newPasswordHash}" 
                          WHERE user = "${obj.user}"`);                  

    if (res.resultAsObj.changedRows > 0) {
      console.log('succes');
      return 'success';
    } else {
      console.log('unchanges');
      return 'unchanges';
    }
  } else {
    console.log('fail');
    Logger.log(res);
    return "fail";
  }
}

export{
  closeLogin,
  loginAndCloseOtherSesions,
  login,
  changePassword
}