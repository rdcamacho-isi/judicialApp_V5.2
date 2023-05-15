import * as utilidades from "./utilidades.je.js";
 
    'use strict'

    window.onload = () => {
 
        // En caso de que se vaya a usar el login se debe INACTIVAR la condicion No2 y ACTIVAR la condicion No1
        
        // condicion No1
        if (sessionStorage.getItem("sesion") === null) {
            utilidades.loadingStart();
            window.location.href = "./login";
            sessionStorage.clear();
           sessionStorage.setItem('loginInUse', true);
            utilidades.loadingEnd();
        } else {
            utilidades.loadingStart();
            window.location.href = "./home"; 
            sessionStorage.clear();        
           sessionStorage.setItem('loginInUse', true);
            utilidades.loadingEnd();
        }

        // condicion No2
        // utilidades.loadingStart();
        // window.location.href = "./isi-tableExample";
        // sessionStorage.clear();
        // sessionStorage.setItem('loginInUse', false);
        // utilidades.loadingEnd();   

    }
    
    