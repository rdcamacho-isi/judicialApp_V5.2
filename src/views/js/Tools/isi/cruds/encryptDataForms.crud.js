(() => {
    'use strict'

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

    //construye objeto con datos encriptados para enviar al back-end y INSERT in base de datos    

    const loadInFormData = (backEndObj, idFom, enableInput) => {
        const obj = JSON.parse(backEndObj);
        Object.keys(obj).forEach(key => {
            const el = document.querySelector(`#${idFom} [data-cbd='${key}']`);
            if (el.type == "checkbox") {
                obj[key] = obj[key] == "true" ? true : obj[key] == "false" ? false : "";
                el.checked = obj[key];
            } else if (el.type == "select-one") {
                let select = Metro.getPlugin(`#${idFom} [data-cbd='${key}']`, 'select');
                select.data({ '0': obj[key] });
                select.val("0");
            } else {
                el.value = obj[key];
            }
            el.disabled = enableInput;
        });
    }

})()
