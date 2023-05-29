let dataTable;
let dataTableIsInitialized = false;

export const buildTableISI = async (result, options) => {

  if (dataTableIsInitialized) dataTable.destroy();

  generateTable(result, options.id, options.name);

  dataTable = $(`#${options.id}`).DataTable(options.config);

  dataTableIsInitialized = true;
};

const generateTable = (result, idiISITable, nameISITable) => {
  const tableContainer = document.getElementById("app");
  const clientsToShow = result.resultAsObj

  // Crear una tabla
  const table = document.createElement("table");
  table.setAttribute('id', idiISITable)
  table.classList.add("table", "striped");

  // 
  const caption = document.createElement("caption");
  caption.textContent = nameISITable
  table.appendChild(caption)

  // Crear el encabezado de la tabla
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = result.colNames;
  headers.forEach(header => {
    if (header == 'ID') {
    } else {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Crear el cuerpo de la tabla
  const tbody = document.createElement("tbody");
  clientsToShow.forEach(client => {
    const row = document.createElement("tr");
    Object.keys(client).forEach(key => {
      if (key != 'ID') {
        const column = document.createElement("td");
        if (client[key].split('|')[1] == 'freeText') {
          column.textContent = client[key].split('|')[0]
        } else if (client[key].split('|')[1] == 'freeButton') {
          const button = document.createElement("button");
          button.textContent = client[key].split('|')[0];
          if (client[key].split('|')[2] != 'noClass') {
            const classes = client[key].split('|')[2].split(' ');
            classes.forEach(clase => {
              button.classList.add(clase);
            })
          }
          if (client[key].split('|')[3] != 'noTooltips') {
            button.title = client[key].split('|')[3]
          }
          let jsonDataset = client[key].split('|')[4]
          if (jsonDataset != 'noJSON') {
            jsonDataset = JSON.parse(jsonDataset)
            Object.keys(jsonDataset).forEach(keyJson => {
              button.dataset[keyJson] = jsonDataset[keyJson]
            })
          }
          column.appendChild(button)
        }
        row.appendChild(column)
      }
    })

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Insertar la tabla en el contenedor
  tableContainer.innerHTML = ""; // Limpiar el contenedor antes de insertar la nueva tabla
  tableContainer.appendChild(table);
};
