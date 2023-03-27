import * as utilidades from "./utilidades.js";
 
(()=>{
 
    'use strict'

    window.onload = () => {
 
        if (sessionStorage.getItem("sesion") === null) {
            utilidades.loadingStart();
            window.location.href = "./login";
            utilidades.loadingEnd();
        } else {
            utilidades.loadingStart();
            window.location.href = "./home";
            utilidades.loadingEnd();
        }
    }
})()