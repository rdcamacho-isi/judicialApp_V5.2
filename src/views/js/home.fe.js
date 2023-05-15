import * as utilidades from "../js/utilidades.je.js";

'use strict'

async function loadNavbar() {
    // utilidades.loadingStart();
    let data = await utilidades.backEndRequest({
        url: 'getNavBar',
        params: {}
    });

    document.getElementById('navbar').innerHTML = data.html;
    utilidades.loadingEnd();    
    
}

////A PARTIR DE AQUÍ EMPIEZAN LOS MANEJADORES DE EVENTOS

//Esta funcion es la que maneja todos los eventos clic
function clickEventHandler(e) {
    //modals
    if (e.target.matches(".closeModalGhf, .closeModalGhf *")) {
        const modal = e.target.closest(".modal");
        modal.querySelector(".modal-body").innerHTML = "";
        $('#' + modal.id).modal('hide');
    }
    //modals      

}


//Esta funcion es la que maneja todos los eventos change
function changeEventHandler(e) {
    if (e.target.matches('#start-date')) {
        showTblReports();
    }

}

//Esta funcion es la que maneja todos los eventos input
function inputEventHandler(e) {


}



document.querySelector('body').addEventListener("click", clickEventHandler);
document.querySelector('body').addEventListener("change", changeEventHandler);
document.querySelector('body').addEventListener("input", inputEventHandler);
document.addEventListener("DOMContentLoaded",loadNavbar);