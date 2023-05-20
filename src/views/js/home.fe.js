import { backEndRequest } from "../js/utilidades.je.js";

'use strict'

export const home = () => {

    const loadNavbar = async () => {
        let data = await backEndRequest({
            url: 'getNavBar',
            params: {}
        });

        document.querySelector('title').innerHTML = 'Home';
        document.getElementById('navbar').innerHTML = data.html;
        document.getElementById("user-name").innerHTML = sessionStorage.user;
    }

    ////A PARTIR DE AQUÍ EMPIEZAN LOS MANEJADORES DE EVENTOS

    //Esta funcion es la que maneja todos los eventos clic
    const clickEventHandler = e => {
        //modals
        if (e.target.matches(".closeModalGhf, .closeModalGhf *")) {
            const modal = e.target.closest(".modal");
            modal.querySelector(".modal-body").innerHTML = "";
            $('#' + modal.id).modal('hide');
        }
        //modals
    }

    //Esta funcion es la que maneja todos los eventos change
    const changeEventHandler = e => { if (e.target.matches('#start-date')) showTblReports(); }

    //Esta funcion es la que maneja todos los eventos input
    const inputEventHandler = e => { }

    document.querySelector('body').addEventListener("click", clickEventHandler);
    document.querySelector('body').addEventListener("change", changeEventHandler);
    document.querySelector('body').addEventListener("input", inputEventHandler);
    document.addEventListener("DOMContentLoaded", loadNavbar);
}
