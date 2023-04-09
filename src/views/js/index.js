import * as utilidades from "./utilidades.js";
 
(()=>{
 
    'use strict'

    window.onload = () => {
 
        // En caso de que se vaya a usar el login se debe INACTIVAR la condicion No2 y ACTIVAR la condicion No1
        
        // condicion No1
        // if (sessionStorage.getItem("sesion") === null) {
        //     utilidades.loadingStart();
        //     window.location.href = "./login";
        //     utilidades.loadingEnd();
        // } else {
        //     utilidades.loadingStart();
        //     window.location.href = "./home"; 
        //     utilidades.loadingEnd();
        // }

        // condicion No2
        utilidades.loadingStart();
        window.location.href = "./home"; 
        utilidades.loadingEnd();        
    }
})()