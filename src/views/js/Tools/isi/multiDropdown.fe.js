/* 
ORIGINAL *TIENE QUE USARSE https://babeljs.io/ PARA QUE SEA COMPATIBLE*
settings selected: 
  Line Wrap
  Prettify
  File Size
Presets
  es2015
  stage-2
  react
*/

'use strict'

export default class dropdown {
    constructor(data) {
        this.data = data;
        this.targets = [];
    }
    filterData(filtersAsArray) {
        return this.data.filter(r => filtersAsArray.every((item, i) => item === r[i]));
    }
    getUniqueValues(dataAsArray, index) {
        const uniqueOptions = new Set();
        dataAsArray.forEach(r => uniqueOptions.add(r[index]));
        return [...uniqueOptions];
    }
    populateDropDown(el, listArray) {
        el.innerHTML = "";
        var disableOption = document.createElement("option");
        disableOption.textContent = "Elija una opción...";
        disableOption.value = "";
        el.appendChild(disableOption);
        listArray.forEach(item => {
            const option = document.createElement("option");
            let itemSplit = item.split("|");
            option.textContent = itemSplit[0];
            if (typeof itemSplit[1] != "undefined") {
                option.value = itemSplit[1];
            }
            if (itemSplit[2] == "desactivar" && itemSplit[0] != "OFICIO" && itemSplit[0] != "MEMORIAL") {
                option.disabled = true;
            }
            el.appendChild(option);
        });
        disableOption.disabled = true;
    }
    createPopulateDropDownFunction(el, elsDependsOn) {
        return () => {
            const elsDependsOnValues = elsDependsOn.length === 0 ? null : elsDependsOn.map(depEl => depEl.value);
            const dataToUse = elsDependsOn.length === 0 ? this.data : this.filterData(elsDependsOnValues);
            const listToUse = this.getUniqueValues(dataToUse, elsDependsOn.length);
            this.populateDropDown(el, listToUse);
        }
    }

    add(options) {
        const el = options.target;
        const elsDependsOn = options.depensOn.length === 0 ? [] : options.depensOn;
        const eventFunction = this.createPopulateDropDownFunction(el, elsDependsOn);
        const targetObject = { el: el, elsDependsOn: elsDependsOn, func: eventFunction };
        targetObject.elsDependsOn.forEach(depEl => depEl.addEventListener("change", eventFunction));
        this.targets.push(targetObject);
        return this;
    }
    initialize() {
        this.targets.forEach(t => t.func());
        return this;
    }
    eazyDropDown(ArrayOfElements) {
        ArrayOfElements.forEach((item, i) => {
            const option = { target: item, depensOn: ArrayOfElements.slice(0, i) };
            this.add(option);
        });
        this.initialize();
        return this;
    }
    eazyDropDownByIds(ArrayOfIds) {
        this.eazyDropDown(ArrayOfIds.map(id => document.getElementById(id)));
        return this;
    }
}    