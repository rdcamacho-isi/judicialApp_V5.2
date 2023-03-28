(()=>{
    'use strict'

    const manageTblGhf = (e) => {

        if (e.target.matches(".btn-buscar-criterios-especificos, .btn-download-tbl *, .btn-download-tbl")) {
            const functionName = e.target.dataset.btnBuscarCriteriosEspecificos;
            const searchInput = e.target.closest(".tbl-with-pag-ghf").querySelector(".searchInput").value;
            const advanceSearchDataBox = e.target.closest(".tbl-with-pag-ghf").querySelectorAll(".busquedaAvanzada-ghf");
            let criteria = {};
            Array.prototype.forEach.call(advanceSearchDataBox, function (el, indexEl) {
                if (el.dataset.type == "date") {
                    const inputs = el.querySelectorAll("INPUT");
                    criteria[el.dataset.col] = { type: "date", fechaInicial: inputs[0].value, fechaFinal: inputs[1].value }
                }
                if (el.dataset.type == "multiselect") {
                    const inputs = el.querySelector("SELECT");
                    criteria[el.dataset.col] = { type: "multiselect", valSelected: $(inputs).val() };
                }
            });

            const typeOfAction = e.target.matches(".btn-buscar-criterios-especificos") ? "imprimirHtml" : "imprimirExcel";

            if (typeOfAction === "imprimirExcel") {
                if (e.target.querySelector(".small-spinner-ghf") != null) {
                    e.target.querySelector(".small-spinner-ghf").classList.remove("d-none");
                    e.target.querySelector(".icon-download-tbl-ghf").classList.add("d-none");
                } else {
                    e.target.closest(".btn-download-tbl").querySelector(".small-spinner-ghf").classList.remove("d-none");
                    e.target.classList.add("d-none");
                }
            }

            window[functionName]({
                elTarget: e,
                page: 1,
                searchWords: searchInput,
                advanceSearchData: criteria,
                typeOfAction: typeOfAction,
                cssSelector: `#${e.target.closest(".tbl-with-pag-ghf").id} .select-pagination[data-select-pag-name="${functionName}"]`,
                cssSelectorSearchCounter: `#${e.target.closest(".tbl-with-pag-ghf").id} .searchCounter[data-search-counter-pag-name="${functionName}"]`,
                searchResultsQuery: e.target.dataset.searchResultsQuery,
                rowTemplateQuery: e.target.dataset.rowTemplateQuery,
                backEndFunc: e.target.dataset.bef,
                user: sessionStorage.user,
                idSpecific: sessionStorage[e.target.dataset.specificId]
            });
        }

        if (e.target.matches(".prev-pagination")) {
            const pageSelected = (+e.target.closest(".tbl-with-pag-ghf").querySelector(".select-pagination").value)
            if (pageSelected > 1) {
                const functionName = e.target.dataset.prevPagName;
                const prevPage = pageSelected - 1;
                const searchInput = e.target.closest(".tbl-with-pag-ghf").querySelector(".searchInput").value;
                const advanceSearchDataBox = e.target.closest(".tbl-with-pag-ghf").querySelectorAll(".busquedaAvanzada-ghf");
                let criteria = {};
                Array.prototype.forEach.call(advanceSearchDataBox, function (el, indexEl) {
                    if (el.dataset.type == "date") {
                        const inputs = el.querySelectorAll("INPUT");
                        criteria[el.dataset.col] = { type: "date", fechaInicial: inputs[0].value, fechaFinal: inputs[1].value }
                    }
                    if (el.dataset.type == "multiselect") {
                        const inputs = el.querySelector("SELECT");
                        criteria[el.dataset.col] = { type: "multiselect", valSelected: $(inputs).val() };
                    }
                });

                window[functionName]({
                    page: prevPage,
                    searchWords: searchInput,
                    typeOfAction: "imprimirHtml",
                    advanceSearchData: criteria,
                    cssSelector: `#${e.target.closest(".tbl-with-pag-ghf").id} .select-pagination[data-select-pag-name="${functionName}"]`,
                    cssSelectorSearchCounter: `#${e.target.closest(".tbl-with-pag-ghf").id} .searchCounter[data-search-counter-pag-name="${functionName}"]`,
                    searchResultsQuery: e.target.dataset.searchResultsQuery,
                    rowTemplateQuery: e.target.dataset.rowTemplateQuery,
                    backEndFunc: e.target.dataset.bef,
                    user: sessionStorage.user,
                    idSpecific: sessionStorage[e.target.dataset.specificId]
                });
            }
        }

        if (e.target.matches(".next-pagination")) {
            const elSelect = e.target.closest(".tbl-with-pag-ghf").querySelector(".select-pagination");
            const pageSelected = (+elSelect.value);
            const lastOption = (+elSelect.querySelector("option:last-child").value);

            if (pageSelected < lastOption) {
                const functionName = e.target.dataset.nextPagName;
                const nextPage = pageSelected + 1;
                const searchInput = e.target.closest(".tbl-with-pag-ghf").querySelector(".searchInput").value;
                const advanceSearchDataBox = e.target.closest(".tbl-with-pag-ghf").querySelectorAll(".busquedaAvanzada-ghf");
                let criteria = {};
                Array.prototype.forEach.call(advanceSearchDataBox, function (el, indexEl) {
                    if (el.dataset.type == "date") {
                        const inputs = el.querySelectorAll("INPUT");
                        criteria[el.dataset.col] = { type: "date", fechaInicial: inputs[0].value, fechaFinal: inputs[1].value }
                    }
                    if (el.dataset.type == "multiselect") {
                        const inputs = el.querySelector("SELECT");
                        criteria[el.dataset.col] = { type: "multiselect", valSelected: $(inputs).val() };
                    }
                });
                window[functionName]({
                    page: nextPage,
                    searchWords: searchInput,
                    advanceSearchData: criteria,
                    typeOfAction: "imprimirHtml",
                    cssSelector: `#${e.target.closest(".tbl-with-pag-ghf").id} .select-pagination[data-select-pag-name="${functionName}"]`,
                    cssSelectorSearchCounter: `#${e.target.closest(".tbl-with-pag-ghf").id} .searchCounter[data-search-counter-pag-name="${functionName}"]`,
                    searchResultsQuery: e.target.dataset.searchResultsQuery,
                    rowTemplateQuery: e.target.dataset.rowTemplateQuery,
                    backEndFunc: e.target.dataset.bef,
                    user: sessionStorage.user,
                    idSpecific: sessionStorage[e.target.dataset.specificId]
                });
            }
        }
        if (e.target.matches(".btn-busquedaAvanzada-criterios-especificos *, .btn-busquedaAvanzada-criterios-especificos")) {
            busquedaAvanzadaTbl(e);
        }

        if (e.target.matches(".select-pagination")) {
            const functionName = e.target.dataset.selectPagName;
            const pageSelected = e.target.value;
            const searchInput = e.target.closest(".tbl-with-pag-ghf").querySelector(".searchInput").value;
            const advanceSearchDataBox = e.target.closest(".tbl-with-pag-ghf").querySelectorAll(".busquedaAvanzada-ghf");
            let criteria = {};
            Array.prototype.forEach.call(advanceSearchDataBox, function (el, indexEl) {
                if (el.dataset.type == "date") {
                    const inputs = el.querySelectorAll("INPUT");
                    criteria[el.dataset.col] = { type: "date", fechaInicial: inputs[0].value, fechaFinal: inputs[1].value }
                }
                if (el.dataset.type == "multiselect") {
                    const inputs = el.querySelector("SELECT");
                    criteria[el.dataset.col] = { type: "multiselect", valSelected: $(inputs).val() };
                }
            });
            window[functionName]({
                page: pageSelected,
                searchWords: searchInput,
                advanceSearchData: criteria,
                typeOfAction: "imprimirHtml",
                cssSelector: `#${e.target.closest(".tbl-with-pag-ghf").id} .select-pagination[data-select-pag-name="${functionName}"]`,
                cssSelectorSearchCounter: `#${e.target.closest(".tbl-with-pag-ghf").id} .searchCounter[data-search-counter-pag-name="${functionName}"]`,
                searchResultsQuery: e.target.dataset.searchResultsQuery,
                rowTemplateQuery: e.target.dataset.rowTemplateQuery,
                backEndFunc: e.target.dataset.bef,
                user: sessionStorage.user,
                idSpecific: sessionStorage[e.target.dataset.specificId]
            });
        }
    }

    const startLoadTblGhf = (e) => {
        const elBoxDestination = document.getElementById(e.idDestination);
        e.arrOfTempTblGhf.forEach((tempId, index) => {
            const tempBox = document.getElementById(tempId);
            loadTemplateV2(tempBox, elBoxDestination);
            loadRowsTblGhfFirstLoad(e.otherData.arrOfList[index]);
            e.otherData.arrOfList[index].loadMultiselect.forEach(obj => {
                addUniqueOptionToDropdownList(document.getElementById(obj.idEl), obj.data.innerHtmlOption, { different: true, data: obj.data.valueOption }, undefined);
            });
        });

    }

    const loadRowsTblGhf = (criterios) => {
        const p = JSON.stringify(criterios);
        loadingStart();
        if (criterios.typeOfAction === "imprimirExcel") {
            loadingEnd();
        }
        google.script.run.withSuccessHandler(obj => {
            const arrWithObj = JSON.parse(obj);
            if (criterios.typeOfAction === "imprimirHtml") {
                document.querySelector(criterios.cssSelectorSearchCounter).textContent = "Resultados: " + arrWithObj.totalCasosRow;
                let searchResultsBox = document.querySelector(criterios.searchResultsQuery);
                let templateBox = document.querySelector(criterios.rowTemplateQuery);
                let template = templateBox.content;
                searchResultsBox.innerHTML = "";
                arrWithObj.casosObj.forEach(function (obj) {
                    let tr = template.cloneNode(true);
                    Object.keys(obj).forEach(key => {
                        const el = tr.querySelector(`.${key}`);
                        if (key.substring(0, 9) != "btnTblGhf") {
                            el.innerHTML = obj[key];
                            el.dataset[key] = obj[key];
                        } else {
                            const btn = el.querySelector("BUTTON");
                            btn.dataset[key] = obj[key];
                        }
                    });
                    searchResultsBox.appendChild(tr);
                });
                hacerPagTbl(arrWithObj, criterios);
                loadingEnd();
            } else if (criterios.typeOfAction === "imprimirExcel") {
                exportTableToExcel(criterios.elTarget, arrWithObj.casosList, filename = '');
                if (criterios.elTarget.target.querySelector(".small-spinner-ghf") != null) {
                    criterios.elTarget.target.querySelector(".small-spinner-ghf").classList.add("d-none");
                    criterios.elTarget.target.querySelector(".icon-download-tbl-ghf").classList.remove("d-none");
                } else {
                    criterios.elTarget.target.closest(".btn-download-tbl").querySelector(".small-spinner-ghf").classList.add("d-none");
                    criterios.elTarget.target.classList.remove("d-none");
                }
            };
        })[criterios.backEndFunc](p);
    }


    const loadRowsTblGhfFirstLoad = (criterios) => {
        loadingStart();
        if (criterios.paramsForCdWithCriteria.typeOfAction === "imprimirExcel") {
            loadingEnd();
        }
        const arrWithObj = JSON.parse(criterios.backEndFunc);
        if (criterios.paramsForCdWithCriteria.typeOfAction === "imprimirHtml") {
            document.querySelector(criterios.paramsForCdWithCriteria.cssSelectorSearchCounter).textContent = "Resultados: " + arrWithObj.totalCasosRow;
            let searchResultsBox = document.querySelector(criterios.paramsForCdWithCriteria.searchResultsQuery);
            let templateBox = document.querySelector(criterios.paramsForCdWithCriteria.rowTemplateQuery);
            let template = templateBox.content;
            searchResultsBox.innerHTML = "";
            arrWithObj.casosObj.forEach(function (obj) {
                let tr = template.cloneNode(true);
                Object.keys(obj).forEach(key => {
                    const el = tr.querySelector(`.${key}`);
                    if (key.substring(0, 9) != "btnTblGhf") {
                        el.innerHTML = obj[key];
                        el.dataset[key] = obj[key];
                    } else {
                        const btn = el.querySelector("BUTTON");
                        btn.dataset[key] = obj[key];
                    }
                });
                searchResultsBox.appendChild(tr);
            });
            hacerPagTbl(arrWithObj, criterios.paramsForCdWithCriteria);
            loadingEnd();
        } else if (criterios.paramsForCdWithCriteria.typeOfAction === "imprimirExcel") {
            exportTableToExcel(criterios.paramsForCdWithCriteria.elTarget, arrWithObj.casosList, filename = '');
            if (criterios.paramsForCdWithCriteria.elTarget.target.querySelector(".small-spinner-ghf") != null) {
                criterios.paramsForCdWithCriteria.elTarget.target.querySelector(".small-spinner-ghf").classList.add("d-none");
                criterios.paramsForCdWithCriteria.elTarget.target.querySelector(".icon-download-tbl-ghf").classList.remove("d-none");
            } else {
                criterios.elTarget.target.closest(".btn-download-tbl").querySelector(".small-spinner-ghf").classList.add("d-none");
                criterios.paramsForCdWithCriteria.elTarget.target.classList.remove("d-none");
            }
        };
    }

    const hacerPagTbl = (e, criterios) => {
        const select = document.querySelector(criterios.cssSelector);
        const totalPagRequired = Math.ceil(e.totalCasosRow / 100);
        let optionsArr = [];
        for (let i = 1; i <= totalPagRequired; i++) {
            optionsArr.push([i])
        };
        addUniqueOptionToDropdownList(select, optionsArr, false, true, criterios.page);
    }

    const busquedaAvanzadaTbl = (e) => {
        const tblContainer = e.target.closest(".tbl-with-pag-ghf");
        const cardClasses = tblContainer.querySelector(".card-busquedaAvanzada-criterios-especificos").classList;
        if (cardClasses.value.indexOf("d-none") == -1) {
            cardClasses.add("d-none");
            tblContainer.querySelectorAll(".busquedaAvanzada-ghf").forEach(el => {
                if (el.dataset.type == "date") {
                    const inputs = el.querySelectorAll("INPUT");
                    inputs[0].value = "";
                    inputs[1].value = "";
                }
                if (el.dataset.type == "multiselect") {
                    const inputs = el.querySelector("SELECT");
                    $(inputs).val("");
                }
            });
        } else {
            cardClasses.remove("d-none");
        };
    }

    //descargar excel
    const encodigText = (text) => {
        const asciiEncodingReference = {
            character: ['\\s', 'Ñ', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'á', 'é', 'í', 'ó', 'ú', 'ü'],
            fromWindows1252: ['%20', '%D1', '%F1', '%C1', '%C9', '%CD', '%D3', '%DA', '%E1', '%E9', '%ED', '%F3', '%FA', '%FC']
        }
        asciiEncodingReference.character.forEach((letter, index) => {
            let encoding = asciiEncodingReference.fromWindows1252[index];
            text = text.replace(new RegExp(letter, 'g'), encoding)
        });

        return text
    }

    const exportTableToExcel = (e, arr, filename = '') => {
        let downloadLink;
        header = e.target.closest(".tbl-with-pag-ghf").querySelectorAll("table thead tr");
        let maqueta = `<table><thead>{thead}</thead><tbody>{tBody}</tbody></table>`;
        let dataType = 'application/vnd.ms-excel';

        const bodyArr = Array.prototype.map.call(arr, function (row, index) {
            return "<tr><td>" + row.join(" ghfDivCol ") + "</td></tr>";
        }).join("").replace(/ ghfDivCol /g, "</td><td>");
        maqueta = maqueta
            .replace("{thead}", header[0].outerHTML)
            .replace("{tBody}", bodyArr);
        let tableHTML = encodigText(maqueta);

        // Specify file name
        filename = filename ? filename + '.xls' : 'excel_report.xls';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            // let blob = new Blob([new Uint8Array(byteArray)], { type: 'text/csv;charset=UTF-16LE;' });

            let blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }
    }
  //descargar excel

})()
