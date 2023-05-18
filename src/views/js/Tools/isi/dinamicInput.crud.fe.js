import * as utilidades from "../../../js/utilidades.je.js";
import dropdown from "../../../js/Tools/isi/multiDropdown.fe.js";

'use strict'

let dinamicInputsArr;

const loadDinamicInputs = (e, filter) => {
    let dinamicInputs;
    if (filter == true) {
        dinamicInputs = dinamicInputsArr.filter(r => {
            return r[1] == e.target.value;
        });
    } else {
        dinamicInputs = dinamicInputsArr;
    }

    if (dinamicInputs.length > 0) {
        const elBoxDestinationDatosEspecificos = document.getElementById("datosEspecificos");
        elBoxDestinationDatosEspecificos.innerHTML = "";
        try { dinamicInputs = JSON.parse(dinamicInputs[0][0]); } catch (e) { };
        let tempBoxDatosEspecificos;
        let i = 0;
        let o = 0;
        Array.prototype.forEach.call(dinamicInputs, (datoEspecifico, index) => {
            let container;

            switch (datoEspecifico.tipoTag) {
                case "dinamicInputGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-input-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#datosEspecificos > div")[i];
                    break;
                case "dinamicCheckBoxGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-label-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    tittleContainer = document.querySelectorAll("#datosEspecificos > div")[i];
                    tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                    i++
                    Array.prototype.forEach.call(datoEspecifico.checkBoxes, (checkBoxObj, indexCheckBoxObj) => {
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-checkBox-temp");
                        utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        containerCheckBox = document.querySelectorAll("#datosEspecificos > div")[i];

                        containerCheckBox.querySelector("label").innerHTML = checkBoxObj.label.titulo;
                        containerCheckBox.querySelector("label").setAttribute("for", checkBoxObj.label.forAttr);

                        Array.prototype.forEach.call(checkBoxObj.datasetTag, (datasetGhf) => {
                            Object.keys(datasetGhf).forEach(key => {
                                containerCheckBox.querySelector(`.${datoEspecifico.tipoTag}`).dataset[key] = datasetGhf[key];
                            });
                        });

                        Array.prototype.forEach.call(checkBoxObj.atributosTag, (attr) => {
                            Object.keys(attr).forEach(key => {
                                containerCheckBox.querySelector(`.${datoEspecifico.tipoTag}`).setAttribute(key, attr[key]);
                            });
                        });
                        i++
                    });
                    break;
                case "dinamicRadioGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-label-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    tittleContainer = document.querySelectorAll("#datosEspecificos > div")[i];
                    tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                    i++
                    Array.prototype.forEach.call(datoEspecifico.radios, (radioObj, indexRadioObj) => {
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-radio-temp");
                        utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        containerRadio = document.querySelectorAll("#datosEspecificos > div")[i];

                        containerRadio.querySelector("label").innerHTML = radioObj.label.titulo;
                        containerRadio.querySelector("label").setAttribute("for", radioObj.label.forAttr);

                        Array.prototype.forEach.call(radioObj.datasetTag, (datasetGhf) => {
                            Object.keys(datasetGhf).forEach(key => {
                                containerRadio.querySelector(`.${datoEspecifico.tipoTag}`).dataset[key] = datasetGhf[key];
                            });
                        });

                        Array.prototype.forEach.call(radioObj.atributosTag, (attr) => {
                            Object.keys(attr).forEach(key => {
                                containerRadio.querySelector(`.${datoEspecifico.tipoTag}`).setAttribute(key, attr[key]);
                            });
                        });
                        i++
                    });

                    break;
                case "dinamicSummernoteGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-summernote-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#datosEspecificos > div")[i];
                    break;
                case "dinamicTextAreaGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-textArea-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#datosEspecificos > div")[i];
                    break;
                case "dinamicSelectGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-select-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    if (typeof datoEspecifico.opcionesSelect != "undefined") {
                        utilidades.addUniqueOptionToDropdownList(document.querySelectorAll("#datosEspecificos .dinamicSelectGhf")[o], datoEspecifico.opcionesSelect.innerHtml, { different: true, data: datoEspecifico.opcionesSelect.value }, undefined);
                        o++
                    }
                    container = document.querySelectorAll("#datosEspecificos > div")[i];
                    break;
                case "dinamicDivGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-div-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#datosEspecificos > div")[i];
                    break;
                case "dinamicTemplateGhf":
                    const temp = document.createElement("template");

                    temp.id = datoEspecifico.idTemp;
                    startCreateTagsInTemplate(temp, datoEspecifico.tags);
                    const tagsForTemp = document.querySelector("#templatePlayGround > div");
                    temp.content.appendChild(tagsForTemp.cloneNode(true));
                    document.querySelector("#" + datoEspecifico.idDestination).appendChild(temp);
                    tagsForTemp.innerHTML = "";
                    break;
            }

            if (["dinamicCheckBoxGhf", "dinamicRadioGhf", "dinamicTemplateGhf"].indexOf(datoEspecifico.tipoTag) == -1) {
                if (typeof datoEspecifico.label != "undefined") {
                    container.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                }
                if (typeof datoEspecifico.label != "undefined" && typeof datoEspecifico.label.forAttr != "undefined") {
                    container.querySelector("label").setAttribute("for", datoEspecifico.label.forAttr);
                }
                Array.prototype.forEach.call(datoEspecifico.datasetTag, (datasetGhf) => {
                    Object.keys(datasetGhf).forEach(key => {
                        container.querySelector(`.${datoEspecifico.tipoTag}`).dataset[key] = datasetGhf[key];
                    });
                });
                Array.prototype.forEach.call(datoEspecifico.atributosTag, (attr) => {
                    Object.keys(attr).forEach(key => {
                        container.querySelector(`.${datoEspecifico.tipoTag}`).setAttribute(key, attr[key]);
                        if (key == "list" && typeof datoEspecifico.datalist.innerHtml != "undefined") {

                            container.querySelector(`datalist`).id = attr[key];
                            utilidades.addUniqueOptionToDropdownList(document.querySelector(`#${attr[key]}`), datoEspecifico.datalist.innerHtml, { different: true, data: datoEspecifico.datalist.value }, undefined);
                        }
                    });
                });

                i++
            }

            if (["dinamicDivGhf"].indexOf(datoEspecifico.tipoTag) > -1) {
                if (typeof container.querySelector("div").dataset.style != "undefined") {
                    //{style: "paddingLeft,2.5%|paddingRigth,2.5%"}
                    const style = container.querySelector("div").dataset.style.split("|");
                    style.forEach(w => {
                        const attribute = w.split(",")[0];
                        const attributeValue = w.split(",")[1];
                        container.style[attribute] = attributeValue;
                    });
                }
            }

            if (datoEspecifico.tipoTag == "dinamicSelectGhf") {
                let aplicarSelectorEspecial = datoEspecifico.datasetTag.map(o => [o.selectWithSearch]).filter(r => typeof r[0] != "undefined")[0];
                if (aplicarSelectorEspecial == "si") {
                    const id = datoEspecifico.atributosTag.map(o => [o.id]).filter(r => typeof r[0] != "undefined")[0];
                    $('#' + id).selectize({
                        sortField: 'text'
                    });
                }
            }

            if (datoEspecifico.tipoTag == "dinamicSummernoteGhf") {
                const idSummerNote = container.querySelector("div").id;
                $(`#${idSummerNote}`).summernote({
                    tabsize: 3,
                    height: 120,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link']]
                    ]
                });
                $(`#${idSummerNote}`).summernote('code', "")
            };
        });
    } else {
        const elBoxDestinationDatosEspecificos = document.getElementById("datosEspecificos");
        elBoxDestinationDatosEspecificos.innerHTML = "";
    }
    document.querySelectorAll(".dinamicSelectGhf").forEach(el => el.value = "")
}

const startCreateTagsInTemplate = async (temp, tags) => {
    await createTagsInTemplate(temp, tags)
}

const createTagsInTemplate = (temp, tags) => {
    let dinamicInputs = tags;
    if (dinamicInputs.length > 0) {
        const elBoxDestinationDatosEspecificos = document.querySelector("#templatePlayGround > div");
        elBoxDestinationDatosEspecificos.innerHTML = "";
        try { dinamicInputs = JSON.parse(dinamicInputs[0][0]); } catch (e) { };
        let tempBoxDatosEspecificos;
        let i = 0;
        let o = 0;
        Array.prototype.forEach.call(dinamicInputs, (datoEspecifico, index) => {
            let container;
            switch (datoEspecifico.tipoTag) {
                case "dinamicInputGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-input-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                    break;
                case "dinamicCheckBoxGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-label-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    tittleContainer = document.querySelectorAll("#templatePlayGround > div > div")[i];
                    tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                    i++
                    Array.prototype.forEach.call(datoEspecifico.checkBoxes, (checkBoxObj, indexCheckBoxObj) => {
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-checkBox-temp");
                        utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        containerCheckBox = document.querySelectorAll("#templatePlayGround > div > div")[i];

                        containerCheckBox.querySelector("label").innerHTML = checkBoxObj.label.titulo;
                        containerCheckBox.querySelector("label").setAttribute("for", checkBoxObj.label.forAttr);

                        Array.prototype.forEach.call(checkBoxObj.datasetTag, (datasetGhf) => {
                            Object.keys(datasetGhf).forEach(key => {
                                containerCheckBox.querySelector(`.${datoEspecifico.tipoTag}`).dataset[key] = datasetGhf[key];
                            });
                        });

                        Array.prototype.forEach.call(checkBoxObj.atributosTag, (attr) => {
                            Object.keys(attr).forEach(key => {
                                containerCheckBox.querySelector(`.${datoEspecifico.tipoTag}`).setAttribute(key, attr[key]);
                            });
                        });
                        i++
                    });
                    break;
                case "dinamicRadioGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-label-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    tittleContainer = document.querySelectorAll("#templatePlayGround > div > div")[i];
                    tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                    i++
                    Array.prototype.forEach.call(datoEspecifico.radios, (radioObj, indexRadioObj) => {
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-radio-temp");
                        utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        containerRadio = document.querySelectorAll("#templatePlayGround > div > div")[i];

                        containerRadio.querySelector("label").innerHTML = radioObj.label.titulo;
                        containerRadio.querySelector("label").setAttribute("for", radioObj.label.forAttr);

                        Array.prototype.forEach.call(radioObj.datasetTag, (datasetGhf) => {
                            Object.keys(datasetGhf).forEach(key => {
                                containerRadio.querySelector(`.${datoEspecifico.tipoTag}`).dataset[key] = datasetGhf[key];
                            });
                        });

                        Array.prototype.forEach.call(radioObj.atributosTag, (attr) => {
                            Object.keys(attr).forEach(key => {
                                containerRadio.querySelector(`.${datoEspecifico.tipoTag}`).setAttribute(key, attr[key]);
                            });
                        });
                        i++
                    });

                    break;
                case "dinamicSummernoteGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-summernote-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                    break;
                case "dinamicTextAreaGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-textArea-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                    break;
                case "dinamicSelectGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-select-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    if (typeof datoEspecifico.opcionesSelect != "undefined") {
                        utilidades.addUniqueOptionToDropdownList(document.querySelectorAll("#templatePlayGround .dinamicSelectGhf")[o], datoEspecifico.opcionesSelect.innerHtml, { different: true, data: datoEspecifico.opcionesSelect.value }, undefined);
                        o++
                    }
                    container = document.querySelectorAll("#templatePlayGround > div > div")[i];

                    break;
                case "dinamicDivGhf":
                    tempBoxDatosEspecificos = document.getElementById("datosEspecificos-div-temp");
                    utilidades.loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                    container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                    break;
            }

            if (["dinamicCheckBoxGhf", "dinamicRadioGhf"].indexOf(datoEspecifico.tipoTag) == -1) {
                if (typeof datoEspecifico.label != "undefined") {
                    container.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                }
                if (typeof datoEspecifico.label != "undefined" && typeof datoEspecifico.label.forAttr != "undefined") {
                    container.querySelector("label").setAttribute("for", datoEspecifico.label.forAttr);
                }

                Array.prototype.forEach.call(datoEspecifico.datasetTag, (datasetGhf) => {
                    Object.keys(datasetGhf).forEach(key => {
                        container.querySelector(`.${datoEspecifico.tipoTag}`).dataset[key] = datasetGhf[key];
                    });
                });
                Array.prototype.forEach.call(datoEspecifico.atributosTag, (attr) => {
                    Object.keys(attr).forEach((key) => {
                        container.querySelector(`.${datoEspecifico.tipoTag}`).setAttribute(key, attr[key]);
                        if (key == "list" && typeof datoEspecifico.datalist.innerHtml != "undefined") {
                            container.querySelector(`datalist`).id = attr[key];
                            utilidades.addUniqueOptionToDropdownList(document.querySelector(`#${attr[key]}`), datoEspecifico.datalist.innerHtml, { different: true, data: datoEspecifico.datalist.value }, undefined);
                        }
                    });
                });

                i++
            }
            if (datoEspecifico.tipoTag == "dinamicSummernoteGhf") {
                /*
                const idSummerNote = container.querySelector("div").id;
                $(`#${idSummerNote}`).summernote({
                  tabsize: 3,
                  height: 120,
                  toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link']]
                  ]
                });   
                */
            };

        });
    } else {
        const elBoxDestinationDatosEspecificos = document.getElementById("datosEspecificos");
        elBoxDestinationDatosEspecificos.innerHTML = "";
    }

}

const dataFuncCriteria = async (e, onChange) => {

    const options = onChange ? e.target.dataset.funcCriteria.split("(-ghf-)") : e.funcCriteria.split("(-ghf-)");
    const optionSelected = onChange ? e.target.value : e.optionSelected;
    let optionsOfIntrest = options.map(r => { return r.split("|") });
    const destination = document.getElementById(optionsOfIntrest[0][2]);
    destination.innerHTML = "";

    optionsOfIntrest = optionsOfIntrest.filter(r => { return r[0] == optionSelected })[0];

    if (typeof optionsOfIntrest != "undefined" && optionsOfIntrest.length > 0) {
        const template = document.getElementById(optionsOfIntrest[1]);
        utilidades.loadTemplateV2(template, destination);
        destination.querySelectorAll(".dinamicSelectGhf").forEach(elSelect => {
            elSelect.options[0].selected = 'selected';
        });

        const selects = destination.querySelectorAll(".dinamicSelectGhf");
        selects.forEach(select => {
            if (select.dataset.selectWithSearch == "si") {
                $('#' + select.id).selectize({
                    sortField: 'text'
                });
            }
        });

        const summerNotes = destination.querySelectorAll(".dinamicSummernoteGhf");
        summerNotes.forEach(summerNote => {
            $(`#${summerNote.id}`).summernote({
                tabsize: 3,
                height: 120,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link']]
                ]
            });
            $(`#${summerNote.id}`).summernote('code', "")
        });

        if (onChange) {
            if (typeof arrForEazyDropDown != 'undefined') {

                new dropdown(arrForEazyDropDown).eazyDropDownByIds(e.target.dataset.idsElForEazyDropDown.split("|"));
            }

        }
    }
}

const numericTempGenerator = async (e, onInput) => {
    const element = onInput ? e.target : e;

    if (element.dataset.numericTempGenerator == "si") {
        const destination = document.getElementById(`box-${element.id}`);
        const totalCurrentRows = destination.querySelectorAll(":scope > .tituloH4Ghf");

        if (element.value == "" || +element.value == totalCurrentRows.length) {
            //no hace nada
        } else if (+element.value == 0) {
            destination.innerHTML = "";
        } else if (totalCurrentRows.length < +element.value) {
            for (let i = totalCurrentRows.length + 1; i <= +element.value; i++) {
                const template = document.getElementById(`temp-${element.id.split("-")[0]}`);
                const templateH4 = document.getElementById("tituloH4-temp");
                const templateHr = document.getElementById("hr-temp");
                utilidades.loadTemplateV2(templateH4, destination);
                utilidades.loadTemplateV2(template, destination);
                utilidades.loadTemplateV2(templateHr, destination);
                const tituloH4 = document.getElementById("tituloH4");
                tituloH4.id = tituloH4.id + "-" + i;
                element.id.split("-").length > 1 ? tituloH4.style.color = "#804538" : tituloH4.style.color = "grey";
                tituloH4.innerHTML = element.dataset.rowTitle + " No " + i;
                const boxOfIntrest = document.querySelectorAll(`#box-${element.id} > div`)[i - 1];
                const fields = boxOfIntrest.querySelectorAll(`[name="name-${element.id.split("-")[0]}"]`);

                for (const field of fields) {
                    field.id = field.id + "-" + (i - 1);
                    field.name = `name-${element.id}` + "-" + (i - 1);
                    if (field.dataset.json != "no") {
                        field.dataset.json = field.dataset.json + "-" + (i - 1);
                    }

                    if (field.tagName == "INPUT") {
                        const list = field.nextElementSibling;
                        list.id = list.id + "-" + (i - 1);
                        field.setAttribute('list', list.id);
                    }

                    if (field.dataset.summer == "si") {
                        $(`#${field.id}`).summernote({
                            tabsize: 3,
                            height: 120,
                            toolbar: [
                                ['style', ['style']],
                                ['font', ['bold', 'underline', 'clear']],
                                ['color', ['color']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link']]
                            ]
                        });
                        $(`#${field.id}`).summernote('code', "")
                    }

                    if (field.tagName.toLowerCase() === 'select') {
                        field.options[0].selected = 'selected'
                    }

                }

                // for(const elSelect of destination.querySelectorAll(".dinamicSelectGhf")){
                //     elSelect.options[0].selected = 'selected';
                // }
            }
        } else if (totalCurrentRows.length > +e.target.value) {
            for (let i = totalCurrentRows.length; i >= +e.target.value + 1; i--) {
                const boxOfIntrest = document.querySelectorAll(`#box-${e.target.id} > div`)[i - 1];
                const h4 = document.querySelectorAll(`#box-${e.target.id} > h4`)[i - 1];
                const hr = document.querySelectorAll(`#box-${e.target.id} > hr`)[i - 1];
                h4.remove();
                boxOfIntrest.remove();
                hr.remove();
            }
        }
    }
}

const builObjToInsert = (cssSelectors) => {
    const inputs = document.querySelectorAll(cssSelectors);
    let obj = {};
    let joins = {};
    let funcCriteria = { arrWithDataset: [] };
    let numericGenerator = { arrkeys: [] };
    Array.prototype.forEach.call(inputs, el => {
        if (el.dataset.json == "no") {
            if (el.dataset.summer == "no") {
                obj[el.dataset.cbd] = el.type == "checkbox" || el.type == "radio" ? el.checked : el.tagName.toLowerCase() == "select" ? $(el).val() : el.value.replace('"', "'").replace(/(\r\n|\n|\r)/g, " ").replace(/\s+/g, " ");


                if (el.dataset.bdlf != "no") {
                    joins[el.dataset.bdlf + "(-ghf-)" + el.dataset.cbd] = "";
                }

                if (typeof el.dataset.funcCriteria != "undefined" && el.dataset.funcCriteria != "no") {
                    //funcCriteria.arrWithDataset.push([el.dataset.cbd, "noJson",el.dataset.funcCriteria]);
                    funcCriteria.arrWithDataset.push({
                        cbd: el.dataset.cbd,
                        funcCriteria: el.dataset.funcCriteria,
                        optionSelected: obj[el.dataset.cbd],
                        keyJson: el.dataset.json
                    });
                }

                if (el.dataset.numericTempGenerator == "si") {
                    numericGenerator.arrkeys.push({
                        cbd: el.dataset.cbd,
                        value: el.value,
                        id: el.id,
                        keyJson: el.dataset.json,
                        dataset: {
                            numericTempGenerator: el.dataset.numericTempGenerator,
                            rowTitle: el.dataset.rowTitle
                        }
                    });
                }

            } else if (el.dataset.summer == "si") {
                let summerNoteCode = $(`#${el.id}`).summernote('code');
                summerNoteCode = summerNoteCode.replace('"', "'")
                    .replace(/(\r\n|\n|\r)/g, " ")
                    .replace(/\s+/g, " ")
                obj[el.dataset.cbd] = summerNoteCode;

            }
        } else {
            obj[el.dataset.cbd] = {};
        }
    });
    Array.prototype.forEach.call(inputs, (el, i) => {
        if (el.dataset.json != "no") {
            if (el.dataset.summer == "no") {
                obj[el.dataset.cbd][`${el.dataset.json}`] = el.type == "checkbox" || el.type == "radio" ? el.checked : el.tagName.toLowerCase() == "select" ? $(el).val() : el.value.replace('"', "'").replace(/(\r\n|\n|\r)/g, " ").replace(/\s+/g, " ");

                if (typeof el.dataset.funcCriteria != "undefined" && el.dataset.funcCriteria != "no") {
                    //funcCriteria.arrWithDataset.push([el.dataset.cbd, obj[el.dataset.cbd][`${el.dataset.json}`], el.dataset.funcCriteria]);
                    funcCriteria.arrWithDataset.push({
                        cbd: el.dataset.cbd,
                        funcCriteria: el.dataset.funcCriteria,
                        optionSelected: obj[el.dataset.cbd][`${el.dataset.json}`],
                        keyJson: el.dataset.json
                    });

                }

                if (el.dataset.numericTempGenerator == "si") {
                    numericGenerator.arrkeys.push({
                        cbd: el.dataset.cbd,
                        value: el.value,
                        id: el.id,
                        keyJson: el.dataset.json,
                        dataset: {
                            numericTempGenerator: el.dataset.numericTempGenerator,
                            rowTitle: el.dataset.rowTitle
                        }
                    });
                }


            } else if (el.dataset.summer == "si") {

                let summerNoteCode = $(`#${el.id}`).summernote('code');
                const removeElSummer = document.getElementById(el.id).closest(".mt-5").querySelectorAll(".note-editor");
                if (removeElSummer.length > 1) {
                    removeElSummer[1].remove();
                }
                summerNoteCode = summerNoteCode.replace('"', "'")
                    .replace(/(\r\n|\n|\r)/g, " ")
                    .replace(/\s+/g, " ")
                obj[el.dataset.cbd][`${el.dataset.json}`] = summerNoteCode;
            }
        }
    });

    return { obj, joins, funcCriteria, numericGenerator }
}

const builObjToSelect = (cssSelectors) => {
    const inputs = document.querySelectorAll(cssSelectors);
    let keysBd = {};
    let joins = {};
    Array.prototype.forEach.call(inputs, el => {
        if (el.dataset.json == "no") {
            keysBd[el.dataset.cbd] = "";
        } else {
            keysBd[el.dataset.cbd] = {};
        }

        if (el.dataset.json == "no" && el.dataset.bdlf != "no") {
            joins[el.dataset.bdlf + "(-ghf-)" + el.dataset.cbd] = "";
        }
    });
    Array.prototype.forEach.call(inputs, (el, i) => {
        if (el.dataset.json != "no") {
            keysBd[el.dataset.cbd][`${el.dataset.json}`] = el.type == "checkbox" ? el.checked : el.value;
        }
    });
    return { keysBd, joins }
}

const loadFormGhf = async (e) => {
    utilidades.loadingStart();
    const session = typeof sessionStorage.getItem("sesion") === "undefined" ? "" : sessionStorage.getItem("sesion");

    console.log({
        url: e.partialFuncName,
        params: {
            loginInUse: sessionStorage.loginInUse,
            sesion: session,
            partialFuncOtherParam: e.partialFuncOtherParam
        }
    });

    const obj = await utilidades.backEndRequest({
        url: e.partialFuncName,
        params: {
            loginInUse: sessionStorage.loginInUse,
            sesion: session,
            partialFuncOtherParam: e.partialFuncOtherParam
        }
    })

    console.log({ obj });

    ///APLICA SI FORMULARIO VA EN UN MODAL
    if (e.target.modal == true) {
        e.modal
        document.getElementById(e.modal.bodyId).innerHTML = "";
        $(`#${e.modal.id}`).modal({
            backdrop: 'static',
            keyboard: false
        });
        $(`#${e.modal.id}`).modal('show');
        utilidades.cleanDataSet(e.modal.id);
        document.querySelector(`#${e.modal.id} > .modal-dialog`).classList.add("modal-lg");
        document.getElementById(e.modal.titleId).textContent = e.modal.titleTextContent;
        document.getElementById(e.modal.bodyId).innerHTML = obj.html;
        document.getElementById(e.formId).id = e.newFormId;
        document.querySelector(`.${e.modal.summitBtnClass}`).id = e.modal.summitBtnId;
        document.querySelector(`.${e.modal.summitBtnClass}`).textContent = e.modal.summitBtnTextContent;
        e.modal.summitBtnDataSets.forEach(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[Object.keys(obj)[0]];
            document.querySelector(`.${e.modal.summitBtnClass}`).dataset[key] = value;
        });

        document.querySelector(`.${e.modal.cancelBtnClass}`).id = e.modal.cancelBtnId;
        e.modal.cancelBtnDataSets.forEach(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[Object.keys(obj)[0]];
            document.querySelector(`.${e.modal.cancelBtnClass}`).dataset[key] = value;
        });

    } else if (e.target.modal == false) {
        ///APLICA SI TBL-GHF NO VA EN MODAL: OJO,EN ESTE CASO SE DEBE AGREGAR BOTON PARA ENVIAR Y PARA CANCELAR   
        document.getElementById(e.noModal.idContainer).innerHTML = obj.html;
        document.getElementById(e.formId).id = e.newFormId;
        const tempBoxbotonesFomNoModal = document.getElementById("temp-botonesFomNoModal");
        const elBoxbotonesFomNoModal = document.getElementById("box-botonesFomNoModal");
        utilidades.loadTemplateV2(tempBoxbotonesFomNoModal, elBoxbotonesFomNoModal);
        document.querySelector("#btn-guardarForm").id = e.noModal.summitBtnId;
        document.querySelector(`#${e.noModal.summitBtnId}`).textContent = e.noModal.summitBtnTextContent;
        e.noModal.summitBtnDataSets.forEach(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[Object.keys(obj)[0]];
            document.querySelector(`#${e.noModal.summitBtnId}`).dataset[key] = value;
        });

        document.querySelector("#btn-cancelarForm").id = e.noModal.cancelBtnId;
        e.noModal.cancelBtnDataSets.forEach(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[Object.keys(obj)[0]];
            document.querySelector(`#${e.noModal.cancelBtnId}`).dataset[key] = value;
        });

        ///APLICA SI TBL-GHF NO VA EN MODAL: OJO,EN ESTE CASO SE DEBE AGREGAR BOTON PARA ENVIAR Y PARA CANCELAR  
    }

    dinamicInputsArr = obj.otherData.form.slice();
    loadDinamicInputs(e, false);

    e.eazyDropDown.forEach((objEazyDropDown, index) => {
        if (objEazyDropDown.isInTemp) {
            arrForEazyDropDown = obj.otherData[objEazyDropDown.arrOtherDataKey];
        } else {
            console.log({ test1: obj.otherData[objEazyDropDown.arrOtherDataKey] });

            console.log({ idsArr: objEazyDropDown.idsArr });


            new dropdown(obj.otherData[objEazyDropDown.arrOtherDataKey]).eazyDropDownByIds(objEazyDropDown.idsArr);
            e.eazyDropDown[index].arr = obj.otherData[objEazyDropDown.arrOtherDataKey];
        }
    });

    if (e.target.edit == true) {
        const dataForForm = await utilidades.backEndRequest({
            url: e.funcNameGetData,
            params: {
                loginInUse: sessionStorage.loginInUse,
                sesion: session,
                id: e.idForEdit
            }
        })

        const lastFormSaved = dataForForm.otherData.form.lastFormSaved;

        for (const objWithDataSet of lastFormSaved.funcCriteria.arrWithDataset) {
            await dataFuncCriteria(objWithDataSet, false);
        }

        for (const objkeyColBd of lastFormSaved.numericGenerator.arrkeys) {
            await numericTempGenerator(objkeyColBd, false);
        }

        loadInFormData({
            backEndObj: dataForForm.otherData.form.lastFormSaved.keysBd,
            idFom: e.newFormId,
            enableInput: e.enableInput,
            colEspecificidades: e.colEspecificidades,
            dropdownArrObjs: e.eazyDropDown
        });
    }

    e.buttonsOnTopForm.forEach((r, i) => {
        const tempBox = document.getElementById("temp-BotonToModal");
        const elBoxDestination = document.getElementById("box-BotonToModal");
        utilidades.loadTemplateV2(tempBox, elBoxDestination);
        let container = document.querySelectorAll("#box-BotonToModal > button")[i];
        container.innerHTML = r.topBtnInnerHTML;
        container.id = r.topBtnId;

        r.topBtnDataSets.forEach(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[Object.keys(obj)[0]];
            container.dataset[key] = value;
        });
    });
    utilidades.loadingEnd();
}

const confirmInsertFormGhf = (e) => {
    const validation = !e.seRequiereValidacion ? true : utilidades.validate(e);
    if (validation) {
        document.getElementById("subModalBody").innerHTML = "";
        $('#subModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        utilidades.cleanDataSet("subModal");
        document.querySelector("#subModal > .modal-dialog").classList.add("modal-sm");
        document.getElementById("subModalTitle").textContent = e.titleTextContent;
        document.getElementById("subModalBody").innerHTML = e.subModalBody;
        document.querySelector(".subModalBtnSummit").id = e.summitBtnId;
        document.querySelector(".subModalBtnSummit").textContent = e.summitBtnTextContent;
        document.querySelector(".subModalBtnCancel").id = e.cancelBtnId;
        e.summitBtnDataSets.forEach(f => {
            Object.keys(f).forEach(key => {
                document.querySelector(".subModalBtnSummit").dataset[key] = f[key];
            });
        });
        $('#subModal').modal('show');
    }
}

const loadInFormData = (e) => {
    const obj = e.backEndObj;
    const arrSelectSearch = [];

    for (const key of Object.keys(obj)) {
        try {
            const el = document.querySelector(`#${e.idFom} [data-cbd='${key}']`);

            if (key == e.colEspecificidades) {
                const objSubEl = obj[key];
                Object.keys(objSubEl).forEach(subKey => {
                    //const subEl = document.querySelector(`#${idFom} [data-json='${subKey.split("-")[0]}']`);
                    const subEl = document.querySelector(`#${e.idFom} [data-json='${subKey}']`);

                    if (subEl.type == "checkbox" || subEl.type == "radio") {
                        objSubEl[subKey] = objSubEl[subKey] == true ? true : objSubEl[subKey] == false ? false : objSubEl[subKey] == "true" ? true : objSubEl[subKey] == "false" ? false : "";
                        subEl.checked = objSubEl[subKey];
                    } else if (subEl.type == "select-one") {
                        if (typeof subEl.dataset.role != "undefined") {
                            let select = Metro.getPlugin(`#${e.idFom} [data-json='${subKey}']`, 'select');
                            select.data({ '0': objSubEl[subKey] });
                            select.val("0");
                        } else {
                            e.dropdownArrObjs.forEach(dropdownArr => {
                                if (dropdownArr.idsArr.indexOf(subEl.id) > -1 && typeof subEl.dataset.dependenciaEazyDropDown != "undefined" && subEl.dataset.dependenciaEazyDropDown != "no") {
                                    const arrOfIdsDependenciaEazyDropDown = subEl.dataset.dependenciaEazyDropDown.split("|");
                                    let filterCol = dropdownArr.arr;
                                    arrOfIdsDependenciaEazyDropDown.forEach(idDependenciaEazyDropDown => {
                                        const arrayIndexDependenciaEazyDropDown = dropdownArr.idsArr.indexOf(idDependenciaEazyDropDown);
                                        filterCol = filterCol.filter(r => {
                                            return r[arrayIndexDependenciaEazyDropDown] == document.getElementById(idDependenciaEazyDropDown).value;
                                        })
                                    });
                                    filterCol = filterCol.map(r => {
                                        let splitHtmlAndValue = r[dropdownArr.idsArr.indexOf(subEl.id)].split("|");
                                        let innerHtmlOption = splitHtmlAndValue[0];
                                        let valueOption = typeof splitHtmlAndValue[1] == "undefined" ? splitHtmlAndValue[0] : splitHtmlAndValue[1];
                                        return [innerHtmlOption, valueOption];
                                    });
                                    let innerHtmlOptions = filterCol.map(r => { return r[0] });
                                    let valueOptios = filterCol.map(r => { return r[1] });

                                    utilidades.addUniqueOptionToDropdownList(document.getElementById(subEl.id), innerHtmlOptions, { different: true, data: valueOptios }, undefined);
                                }

                            });

                            if (typeof subEl.dataset.selectWithSearch != "undefined" && subEl.dataset.selectWithSearch != "no") {
                                arrSelectSearch.push(subEl.id)
                            }
                            subEl.value = objSubEl[subKey];
                        }
                    } else if (subEl.type == "select-multiple") {
                        //TEST NO ESTA TERMINADO
                        subEl.value = objSubEl[subKey];
                        $(`#${e.idFom} [data-json='${subKey}']`).val();
                    } else {
                        if (subEl.dataset.summer == "no") {
                            subEl.value = objSubEl[subKey];
                        } else if (subEl.dataset.summer == "si") {

                            $(`#${e.idFom} [data-json='${subKey}']`).summernote('code', objSubEl[subKey]);
                        }
                    }
                });
            } else if (el !== null && (el.type == "checkbox" || el.type == "radio")) {
                obj[key] = obj[key] == "true" ? true : obj[key] == "false" ? false : "";
                el.checked = obj[key];
            } else if (el !== null && el.type == "select-one") {
                if (typeof el.dataset.role != "undefined") {
                    let select = Metro.getPlugin(`#${e.idFom} [data-cbd='${key}']`, 'select');
                    select.data({ '0': obj[key] });
                    select.val("0");
                } else {
                    e.dropdownArrObjs.forEach(dropdownArr => {
                        if (dropdownArr.idsArr.indexOf(el.id) > -1 && typeof el.dataset.dependenciaEazyDropDown != "undefined" && el.dataset.dependenciaEazyDropDown != "no") {
                            const arrOfIdsDependenciaEazyDropDown = el.dataset.dependenciaEazyDropDown.split("|");
                            let filterCol = dropdownArr.arr;
                            arrOfIdsDependenciaEazyDropDown.forEach(idDependenciaEazyDropDown => {
                                const arrayIndexDependenciaEazyDropDown = dropdownArr.idsArr.indexOf(idDependenciaEazyDropDown);
                                filterCol = filterCol.filter(r => {
                                    return r[arrayIndexDependenciaEazyDropDown] == document.getElementById(idDependenciaEazyDropDown).value;
                                })
                            });
                            filterCol = filterCol.map(r => {
                                let splitHtmlAndValue = r[dropdownArr.idsArr.indexOf(el.id)].split("|");
                                let innerHtmlOption = splitHtmlAndValue[0];
                                let valueOption = typeof splitHtmlAndValue[1] == "undefined" ? splitHtmlAndValue[0] : splitHtmlAndValue[1];
                                return [innerHtmlOption, valueOption];
                            });

                            let innerHtmlOptions = filterCol.map(r => { return r[0] });
                            let valueOptios = filterCol.map(r => { return r[1] });

                            utilidades.addUniqueOptionToDropdownList(document.getElementById(el.id), innerHtmlOptions, { different: true, data: valueOptios }, undefined);
                        }
                    });

                    if (typeof el.dataset.selectWithSearch != "undefined" && el.dataset.selectWithSearch != "no") {
                        arrSelectSearch.push(el.id);

                        let u = $('#' + el.id).selectize();

                        u[0].selectize.setValue(obj[key])

                    }
                    el.value = obj[key];
                }
            } else if (el !== null && el.type == "select-multiple") {
                //TEST NO ESTA TERMINADO
                el.value = obj[key];
                $(`#${e.idFom} [data-cbd='${key}']`).val();
            } else if (el !== null) {
                if (el.dataset.summer == "no") {
                    el.value = obj[key];
                } else if (el.dataset.summer == "si") {

                    $(`#${e.idFom} [data-cbd='${key}']`).summernote('code', obj[key]);
                }
            }
        } catch (err) {
            console.log(err)
        }
    }


    arrSelectSearch.forEach(idTest => {
        $('#' + idTest).selectize({
            sortField: 'text'
        });
    })

    const elToDisabled = document.querySelector(`#${e.idFom}`).querySelectorAll("input,textarea,select,button,div");
    elToDisabled.forEach((el, index) => {
        if (typeof el.dataset.summer == "undefined" || el.dataset.summer == "no" || el.dataset.selectWithSearch == "no" && e.enableInput == false) {
            el.disabled = true;
        }

        if (el.dataset.summer == "si") {
            $(el).summernote('disable');
        }

        if (el.dataset.selectWithSearch == "si") {
            $("#" + el.id).selectize()[0].selectize.lock();
        }
    });
}

const habilitarEdicionForm = (e) => {

    const modalSummitButtonClass = e.idModalBody == "modalBody" ? "modalBtnSummit" : e.idModalBody == "subModalBody" ? "subModalBtnSummit" : e.idModalBody == "modalBody2" ? "modalBtnSummit2" : "";
    const elToEnable = document.querySelector(`#${e.idModalBody}`).querySelectorAll("input,textarea,select,button,div,button");
    const disabledSummerNote = e.disabled == false ? "enable" : "disable";
    const disabledSelectize = e.disabled == false ? "unlock" : "lock";

    elToEnable.forEach(el => {
        //el.disabled = e.disabled;
        if (typeof el.dataset.summer == "undefined" || el.dataset.summer == "no" || el.dataset.selectWithSearch == "no") {
            el.disabled = e.disabled;
        }

        if (el.dataset.summer == "si") {
            $(el).summernote(disabledSummerNote);
        }

        if (el.dataset.selectWithSearch == "si") {
            $("#" + el.id).selectize()[0].selectize[disabledSelectize]();
        }
    });
    document.querySelector(`.${modalSummitButtonClass}`).id = e.idBtnSummit;
    document.querySelector(`.${modalSummitButtonClass}`).textContent = e.innerHtmlBtnSummit;

}

export {
    loadDinamicInputs,
    startCreateTagsInTemplate,
    createTagsInTemplate,
    dataFuncCriteria,
    numericTempGenerator,
    builObjToInsert,
    builObjToSelect,
    loadFormGhf,
    confirmInsertFormGhf,
    loadInFormData,
    habilitarEdicionForm
}
