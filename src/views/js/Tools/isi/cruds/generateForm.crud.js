(()=>{
    'use strict'
    let arrForEazyDropDown;

    const loadFormGhf = async (e) => {
        loadingStart();
        const session = typeof sessionStorage.getItem("sesion") === "undefined" ? "" : sessionStorage.getItem("sesion");
        const backEndObj = await runGoogleScript({
            func: e.partialFuncName, params: {
                sesion: session,
                partialFuncOtherParam: e.partialFuncOtherParam
            }
        });
        const obj = JSON.parse(backEndObj);

        obj.otherData = JSON.parse(obj.otherData);  //ok

        ///APLICA SI FORMULARIO VA EN UN MODAL
        if (e.target.modal == true) {
            e.modal
            document.getElementById(e.modal.bodyId).innerHTML = "";
            $(`#${e.modal.id}`).modal({
                backdrop: 'static',
                keyboard: false
            });
            cleanDataSet(e.modal.id);
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
            loadTemplateV2(tempBoxbotonesFomNoModal, elBoxbotonesFomNoModal);
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
                new dropdown(obj.otherData[objEazyDropDown.arrOtherDataKey]).eazyDropDownByIds(objEazyDropDown.idsArr);
                e.eazyDropDown[index].arr = obj.otherData[objEazyDropDown.arrOtherDataKey];
            }
        });

        if (e.target.edit == true) {
            const dataForForm = await runGoogleScript({
                func: e.funcNameGetData,
                params: {
                    sesion: session,
                    id: e.idForEdit
                }
            });

            for (const objWithDataSet of dataForForm.lastFormSaved.funcCriteria.arrWithDataset) {
                await dataFuncCriteria(objWithDataSet, false);
            }

            for (const objkeyColBd of dataForForm.lastFormSaved.numericGenerator.arrkeys) {
                await numericTempGenerator(objkeyColBd, false);
            }

            loadInFormData({
                backEndObj: dataForForm.keyAndValues,
                idFom: e.newFormId,
                enableInput: e.enableInput,
                colEspecificidades: e.colEspecificidades,
                dropdownArrObjs: e.eazyDropDown
            });
        }

        e.buttonsOnTopForm.forEach((r, i) => {
            const tempBox = document.getElementById("temp-BotonToModal");
            const elBoxDestination = document.getElementById("box-BotonToModal");
            loadTemplateV2(tempBox, elBoxDestination);
            let container = document.querySelectorAll("#box-BotonToModal > button")[i];
            container.innerHTML = r.topBtnInnerHTML;
            container.id = r.topBtnId;

            r.topBtnDataSets.forEach(obj => {
                const key = Object.keys(obj)[0];
                const value = obj[Object.keys(obj)[0]];
                container.dataset[key] = value;
            });
        });
        loadingEnd();
    }

    const confirmInsertFormGhf = (e) => {
        const validation = !e.seRequiereValidacion ? true : validate(e);
        if (validation) {
            document.getElementById("subModalBody").innerHTML = "";
            $('#subModal').modal({
                backdrop: 'static',
                keyboard: false
            });
            cleanDataSet("subModal");
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
        }
    }

})()

