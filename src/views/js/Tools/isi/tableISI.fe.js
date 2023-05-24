export const buildTableISI = async (result, idiISITable) => {
    console.log(idiISITable)

    const clientList = result.resultAsObj

    // Variables de paginación
    const recordsPerPage = 10;
    let currentPage = 1;

    // Obtener el elemento contenedor donde se insertará la tabla
    const tableContainer = document.getElementById("app");

    const generateTable = (idiISITable) => {
        console.log('+ ' + idiISITable)
        // Calcular el rango de registros a mostrar en la página actual
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const clientsToShow = clientList.slice(startIndex, endIndex);

        // Crear una tabla
        const table = document.createElement("table");
        table.setAttribute('id', idiISITable)
        table.classList.add("table", "striped");

        // Crear el encabezado de la tabla
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = result.colNames;
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Crear el cuerpo de la tabla
        const tbody = document.createElement("tbody");
        clientsToShow.forEach(client => {
            // console.log(client)
            const row = document.createElement("tr");
            Object.keys(client).forEach(key => {
                const column = document.createElement("td");
                if (client[key].split('|')[1] == 'freeText') {
                    console.log('Hola')
                    column.textContent = client[key].split('|')[0]
                } else if (client[key].split('|')[1] == 'freeButton') {
                    const button = document.createElement("button");
                    button.textContent = client[key].split('|')[0];
                    button.classList.add(client[key].split('|')[2]);
                    let jsonDataset = client[key].split('|')[3]
                    if (typeof jsonDataset != 'undefined') {
                        jsonDataset = JSON.parse(jsonDataset)
                        Object.keys(jsonDataset).forEach(keyJson => {
                            button.dataset[keyJson] = jsonDataset[keyJson]
                        })
                    }
                    column.appendChild(button)
                }
                row.appendChild(column)
            })

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Insertar la tabla en el contenedor
        tableContainer.innerHTML = ""; // Limpiar el contenedor antes de insertar la nueva tabla
        tableContainer.appendChild(table);
    };

    // Generar la tabla inicial
    generateTable(idiISITable);
};