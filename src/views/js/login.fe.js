import * as utilidades from "./utilidades.je.js";

'use strict'

const tryLogin = async () => {
  console.log('cososo');
  utilidades.loadingStart();
  var user = document.getElementById("userLoginView").value;
  var password = document.getElementById("password").value;

  console.log({
    user,
    password
  });

  const result = await utilidades.backEndRequest({
    url: "tryLogin",
    params: {
      user,
      password
    }
  });

  console.log({ resultFE: result });

  if (result === "no") {
    swal("Alerta!", "Usuario o clave incorrecta!", "error");
  } else if (result === "otros") {
    swal({
      title: "Hay una sesión abierta con este usuario actualmente!",
      text: `Seleccione "CONTINUAR" para ingresar (esto cerrará cualquier otra sesión abierta).`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((continuar) => {
        if (continuar) {
          login();
        } else {
          utilidades.loadingEnd();
        }
      });
  } else {
    window.location.href = ".home";
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("sesion", result);
    utilidades.loadingEnd();

    swal("Alerta!", "Usuario o clave incorrecta!", "error");
  }
}

const login = async () => {
  utilidades.loadingStart();
  var user = document.getElementById("userLoginView").value;
  var password = document.getElementById("password").value;

  const result = await utilidades.backEndRequest({
    url: "login",
    params: {
      user,
      password
    }
  });

  if (result === "no") {
    swal("Alerta!", "Usuario o clave incorrecta!", "error");
  } else {
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("sesion", result);
    window.location.href = "./home";
    utilidades.loadingEnd();
  }
}

const closeLogin = async (trigger) => {
  console.log(2)
  if (document.getElementById("userLoginView") === null) {
    const sesion = sessionStorage.getItem("sesion");
    const result = await utilidades.backEndRequest({
      url: "closeLogin",
      params: {
        sesion,
        trigger
      }
    });

    if (result === "1") {
      sessionStorage.removeItem("sesion");
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    }
  }
}

const clickEventHandler = (e) => {
  if (e.target.matches("#btn-login")) {
    tryLogin();
  }
}

setInterval(() => { closeLogin("time"); }, 1000);

window.onload = (e) => {
  const localPath = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;
  const pathSplit = localPath.split('/');
  const pathname = pathSplit[pathSplit.length - 1]
  if (pathname == "login") {
    document.getElementById("work-area").addEventListener("click", clickEventHandler);
  }
}


export default {

}