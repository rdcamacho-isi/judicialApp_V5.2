(()=>{
    'use strict'
    const loadInFormData = (e) => {
        const obj = JSON.parse(e.backEndObj);
        const arrSelectSearch = [];
    
        Object.keys(obj).forEach(key => {
            try {
                const el = document.querySelector(`#${e.idFom} [data-cbd='${key}']`);
    
                if (key == e.colEspecificidades) {
                    const objSubEl = JSON.parse(obj[key]);
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
    
                                        addUniqueOptionToDropdownList(document.getElementById(subEl.id), innerHtmlOptions, { different: true, data: valueOptios }, undefined);
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
                } else if (el.type == "checkbox" || el.type == "radio") {
                    obj[key] = obj[key] == "true" ? true : obj[key] == "false" ? false : "";
                    el.checked = obj[key];
                } else if (el.type == "select-one") {
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
    
                                addUniqueOptionToDropdownList(document.getElementById(el.id), innerHtmlOptions, { different: true, data: valueOptios }, undefined);
                            }
                        });
    
                        if (typeof el.dataset.selectWithSearch != "undefined" && el.dataset.selectWithSearch != "no") {
                            arrSelectSearch.push(el.id);
    
                            let u = $('#' + el.id).selectize();
    
                            u[0].selectize.setValue(obj[key])
    
                        }
                        el.value = obj[key];
                    }
                } else if (el.type == "select-multiple") {
                    //TEST NO ESTA TERMINADO
                    el.value = obj[key];
                    $(`#${e.idFom} [data-cbd='${key}']`).val();
                } else {
                    if (el.dataset.summer == "no") {
                        el.value = obj[key];
                    } else if (el.dataset.summer == "si") {
    
                        $(`#${e.idFom} [data-cbd='${key}']`).summernote('code', obj[key]);
                    }
                }
            } catch (e) { }
        });
    
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
    
})()

