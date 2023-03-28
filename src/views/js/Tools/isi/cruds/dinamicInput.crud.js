(() => {
    'use strict'

    let dinamicInputsArr;
    const loadDinamicInputs = (e, filter) => {
        if (filter == true) {
            let dinamicInputs = dinamicInputsArr.filter(r => {
                return r[1] == e.target.value;
            });
        } else {
            let dinamicInputs = dinamicInputsArr;
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
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        container = document.querySelectorAll("#datosEspecificos > div")[i];
                        break;
                    case "dinamicCheckBoxGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-label-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        tittleContainer = document.querySelectorAll("#datosEspecificos > div")[i];
                        tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                        i++
                        Array.prototype.forEach.call(datoEspecifico.checkBoxes, (checkBoxObj, indexCheckBoxObj) => {
                            tempBoxDatosEspecificos = document.getElementById("datosEspecificos-checkBox-temp");
                            loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
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
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        tittleContainer = document.querySelectorAll("#datosEspecificos > div")[i];
                        tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                        i++
                        Array.prototype.forEach.call(datoEspecifico.radios, (radioObj, indexRadioObj) => {
                            tempBoxDatosEspecificos = document.getElementById("datosEspecificos-radio-temp");
                            loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
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
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        container = document.querySelectorAll("#datosEspecificos > div")[i];
                        break;
                    case "dinamicTextAreaGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-textArea-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        container = document.querySelectorAll("#datosEspecificos > div")[i];
                        break;
                    case "dinamicSelectGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-select-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        if (typeof datoEspecifico.opcionesSelect != "undefined") {
                            addUniqueOptionToDropdownList(document.querySelectorAll("#datosEspecificos .dinamicSelectGhf")[o], datoEspecifico.opcionesSelect.innerHtml, { different: true, data: datoEspecifico.opcionesSelect.value }, undefined);
                            o++
                        }
                        container = document.querySelectorAll("#datosEspecificos > div")[i];
                        break;
                    case "dinamicDivGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-div-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
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
                                addUniqueOptionToDropdownList(document.querySelector(`#${attr[key]}`), datoEspecifico.datalist.innerHtml, { different: true, data: datoEspecifico.datalist.value }, undefined);
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
        dinamicInputs = tags;
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
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                        break;
                    case "dinamicCheckBoxGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-label-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        tittleContainer = document.querySelectorAll("#templatePlayGround > div > div")[i];
                        tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                        i++
                        Array.prototype.forEach.call(datoEspecifico.checkBoxes, (checkBoxObj, indexCheckBoxObj) => {
                            tempBoxDatosEspecificos = document.getElementById("datosEspecificos-checkBox-temp");
                            loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
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
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        tittleContainer = document.querySelectorAll("#templatePlayGround > div > div")[i];
                        tittleContainer.querySelector("label").innerHTML = datoEspecifico.label.titulo;
                        i++
                        Array.prototype.forEach.call(datoEspecifico.radios, (radioObj, indexRadioObj) => {
                            tempBoxDatosEspecificos = document.getElementById("datosEspecificos-radio-temp");
                            loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
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
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                        break;
                    case "dinamicTextAreaGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-textArea-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        container = document.querySelectorAll("#templatePlayGround > div > div")[i];
                        break;
                    case "dinamicSelectGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-select-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
                        if (typeof datoEspecifico.opcionesSelect != "undefined") {
                            addUniqueOptionToDropdownList(document.querySelectorAll("#templatePlayGround .dinamicSelectGhf")[o], datoEspecifico.opcionesSelect.innerHtml, { different: true, data: datoEspecifico.opcionesSelect.value }, undefined);
                            o++
                        }
                        container = document.querySelectorAll("#templatePlayGround > div > div")[i];

                        break;
                    case "dinamicDivGhf":
                        tempBoxDatosEspecificos = document.getElementById("datosEspecificos-div-temp");
                        loadTemplateV2(tempBoxDatosEspecificos, elBoxDestinationDatosEspecificos);
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
                                addUniqueOptionToDropdownList(document.querySelector(`#${attr[key]}`), datoEspecifico.datalist.innerHtml, { different: true, data: datoEspecifico.datalist.value }, undefined);
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
            loadTemplateV2(template, destination);
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
                new dropdown(arrForEazyDropDown).eazyDropDownByIds(e.target.dataset.idsElForEazyDropDown.split("|"));
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
                    loadTemplateV2(templateH4, destination);
                    loadTemplateV2(template, destination);
                    loadTemplateV2(templateHr, destination);
                    const tituloH4 = document.getElementById("tituloH4");
                    tituloH4.id = tituloH4.id + "-" + i;
                    element.id.split("-").length > 1 ? tituloH4.style.color = "#804538" : tituloH4.style.color = "grey";
                    tituloH4.innerHTML = element.dataset.rowTitle + " No " + i;
                    const boxOfIntrest = document.querySelectorAll(`#box-${element.id} > div`)[i - 1];
                    const fields = boxOfIntrest.querySelectorAll(`[name="name-${element.id.split("-")[0]}"]`);

                    fields.forEach(field => {
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
                    });

                    destination.querySelectorAll(".dinamicSelectGhf").forEach(elSelect => {
                        elSelect.options[0].selected = 'selected';
                    });
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

})()
