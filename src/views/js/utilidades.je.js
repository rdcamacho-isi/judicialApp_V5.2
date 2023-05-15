/**
 * @param {Object} options - Este objeto recibe dos parametros descritos abajo
 *
 * @ParametrosObjetoOptions 
 * - url: Es la URL que esta en router.js
 * - params: parametros que se le envian a las función
 *   
 * @description Esta función ejecuta un metodo tipo POST
 *
 * 
 * @Resultados
 * Devuelve el return del backEnd
 */

const backEndRequest = async (options) => {
    const params = typeof options.params == "undefined" ? {} : options.params;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/${options.url}`,
        method: 'POST',
        data: JSON.stringify({ data: params }),
        contentType: 'application/json',
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  };

const backEndRequestForFiles = async (options) => {
    const params = typeof options.params == "undefined" ? {} : options.params;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/${options.url}`,
            method: 'POST',
            data: options.body, // directly send the FormData object
            processData: false, // add this line to prevent jQuery from processing the data
            contentType: false, // add this line to set the correct content type automatically
            success: (data) => {
                resolve(data);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
};

// const backEndRequest = async (options) => {
//     const params = typeof options.data == "undefined" ? undefined : options.data;
//     return new Promise((resolve, reject) => {
//         // console.log({optionsurl: `/${options.url}`})
//         // console.log({params: params})
//         $.post(`/loadClienteView `, {data: {
//             loginInUse: sessionStorage.loginInUse
//         }}, (data) => {
//             resolve(data);
//         }).fail((err) => {
//             reject(err);
//         });
//     })
// }

const activarSelectMetroUi = (cssSelector) => {
    return new Promise(resolve => {
        resolve(Metro.getPlugin(`${cssSelector}`, 'select'))
    });
}

/**
 * @param {string} inicial - Palabla o letra con la que inicia el id
 *  
 * @funcion Generar id alfanumerico
 * 
 * @Resultados
 * Id alfanumerico
 */
const generateId = (inicial) => {
    inicial = typeof inicial === "undefined" ? "z" : inicial;
    return `${inicial}-${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * @param {date} fecha
 *  
 * @funcion Cuando recibe una fecha con formato javaScript la convierte a formato SQL
 * 
 * @ejemplo
 * si se pasa 2023-01-01T22:09:13.195Z (javaScript) la función devuelve 2023-01-01 17:09:13
 */

const fechaJsToSql = (fecha) => {
    console.log(fecha)
    const mes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const minutosSegundos = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
    console.log(fecha.getFullYear() + "-" + mes[fecha.getMonth()] + "-" + dias[fecha.getDate() - 1] + " " + horas[fecha.getHours()] + ":" + minutosSegundos[fecha.getMinutes()] + ":" + minutosSegundos[fecha.getSeconds()])
    return fecha.getFullYear() + "-" + mes[fecha.getMonth()] + "-" + dias[fecha.getDate() - 1] + " " + horas[fecha.getHours()] + ":" + minutosSegundos[fecha.getMinutes()] + ":" + minutosSegundos[fecha.getSeconds()];
}

const validate = (e) => {
    //*INICIO* 3. Seleccionar varias etiquetas dentro de otra
    var arrValidations = [];
    var form = e.target.closest(".valGHF");
    var fieldsToValidate = form.querySelectorAll("input, textarea, select");
    //*FIN* 3. Seleccionar varias etiquetas dentro de otra
    Array.prototype.forEach.call(fieldsToValidate, function (el) {
        var radios = document.querySelectorAll(`[name="${el.name}"][type="radio"][required]`);
        var checkboxes = document.querySelectorAll(`[name="${el.name}"][type="checkbox"]`);
        if (radios.length > 0) {
            const validationRadios = Array.prototype.slice.call(radios).some(x => x.checked);
            arrValidations.push(validationRadios);
            if (!validationRadios) {
                radios[0].closest("div").previousElementSibling.querySelector("label").style.color = "red";
                //el.classList.add("is-invalid");
            } else {
                radios[0].closest("div").previousElementSibling.querySelector("label").style.color = "black";
                //el.classList.remove("is-invalid");
            }
        }

        if (checkboxes.length > 0) {
            const validationCheckboxes = Array.prototype.slice.call(checkboxes).some(x => x.checked);
            arrValidations.push(validationCheckboxes);
            if (!validationCheckboxes) {
                checkboxes[0].closest("div").previousElementSibling.querySelector("label").style.color = "red";
                //el.classList.add("is-invalid");
            } else {
                checkboxes[0].closest("div").previousElementSibling.querySelector("label").style.color = "black";
                //el.classList.remove("is-invalid");
            }
        }

        if (el.checkValidity() && el.type != "checkbox" && el.type != "radio") {
            if (el.closest("div").classList.contains("selectize-input")) {
                el.closest("div").style.border = "1px solid #d1d1d1";
            } else if (el.classList.contains("selectpicker-search")) {
                el.parentElement.style.border = "1px"
            } else {
                el.classList.remove("is-invalid");
            }
        } else if (!el.checkValidity() && el.type != "checkbox" && el.type != "radio") {
            if (el.closest("div").classList.contains("selectize-input")) {
                el.closest("div").style.border = "1px solid red";
            } else if (el.classList.contains("selectpicker-search")) {
                el.parentElement.style.border = "1px solid red";
            } else {
                el.classList.add("is-invalid");
            }
        };
    });

    var summerNotesToValidate = form.querySelectorAll("[required]");
    for (const el of summerNotesToValidate) {
        if (el.tagName == "DIV") {
            var labelSummerNote = el.closest(".mt-5").querySelector("label");
            if ($('#' + el.id).summernote('isEmpty')) {
                arrValidations.push(false);
                labelSummerNote.style.color = "red";
            } else {
                arrValidations.push(true);
                labelSummerNote.style.color = "black";
            }
        }
    }


    //*INICIO* 4. Bucles a nodeList en archivo HTML
    const validationOthers = Array.prototype.every.call(fieldsToValidate, function (el) {
        return el.checkValidity();
    });
    arrValidations.push(validationOthers);

    const generalValidation = Array.prototype.every.call(arrValidations, function (el) {
        return el;
    });

    return generalValidation;
    /*
    return Array.prototype.every.call(fieldsToValidate, function(el){
      return el.checkValidity();
    });
    */
    //*FIN* 4. Bucles diferentes a forEach en archivo HTML
}

const addUniqueOptionToDropdownList = (el, array, arrayValue, disableOptionActivated, selectEspecificOption) => {
    el.innerHTML = "";
    //$('.selectpicker-search').selectpicker('refresh');
    if (typeof disableOptionActivated === "undefined") {
        var disableOption = document.createElement("option");
        disableOption.textContent = "Elija una opción...";
        disableOption.value = "";
        el.appendChild(disableOption);
    }
    var currentlyAdded = [];
    array.forEach(function (r, index) {
        if (currentlyAdded.indexOf(r) === -1) {
            var option = document.createElement("option");
            option.textContent = r;
            if (arrayValue.different) {
                option.value = arrayValue.data[index];
            } else {
                option.value = r;
            }
            el.appendChild(option);
            currentlyAdded.push(r);
        };
    });
    if (typeof disableOptionActivated === "undefined") {
        disableOption.disabled = true;
    }
    if (typeof selectEspecificOption != "undefined") {
        el.value = selectEspecificOption;
    }
}

const loadTemplateV2 = (tempBox, elBoxDestination) => {
    //divBox.innerHTML = "";
    const template = tempBox.content;
    const cloneTemplate = template.cloneNode(true);
    elBoxDestination.appendChild(cloneTemplate);
    return cloneTemplate;
}


const loadingStart = () => {
    document.getElementById("loading").classList.remove("invisible");
}

const loadingEnd = () => {
    document.getElementById("loading").classList.add("invisible");
}

function cleanDataSet(modalId) {
    const botonesModal = $(`#${modalId} .modal-footer button`);
    botonesModal.each(index => {
        Object.keys(botonesModal[index].dataset).forEach(key => {
            if (botonesModal[index].dataset[key] != "dismiss") {
                delete botonesModal[index].dataset[key];
            }
        });
        botonesModal[index].id = "";
    })
}

function formatDateAndTime(isoTimestamp) {
    const dateTime = new Date(isoTimestamp);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function delay(delayInMilliseconds) {
    return new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
}

export {
    backEndRequest,
    activarSelectMetroUi,
    generateId,
    fechaJsToSql,
    validate,
    addUniqueOptionToDropdownList,
    loadTemplateV2,
    loadingStart,
    loadingEnd,
    cleanDataSet,
    backEndRequestForFiles,
    formatDateAndTime,
    delay
}