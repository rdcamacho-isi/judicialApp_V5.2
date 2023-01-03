import * as utilidades from "./utilidades.js";

const tryLogin = async () => {
  utilidades.loadingStart();
  var user = document.getElementById("userLoginView").value;
  var password = document.getElementById("password").value;

  const result = await utilidades.backEndRequest({
    url: "/tryLogin",
    params: {
      user,
      password
    }
  });

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

        }
      });
  } else {

    window.location.href = "./test";
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
    url: "/login",
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
    window.location.href = "./test";
    utilidades.loadingEnd();
  }
}

const closeLogin = async (trigger) => {
  console.log(2)
  if (document.getElementById("userLoginView") === null) {
    const sesion = sessionStorage.getItem("sesion");
    const result = await utilidades.backEndRequest({
      url: "/closeLogin",
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

setInterval(() => { closeLogin("time"); }, 60000);

window.onload = (e) => {
  if (e.path[0].location.pathname == "/login") {
    document.getElementById("work-area").addEventListener("click", clickEventHandler);
  }
}

(function ($) {

  "use strict";

})(jQuery);

export default{
  
}