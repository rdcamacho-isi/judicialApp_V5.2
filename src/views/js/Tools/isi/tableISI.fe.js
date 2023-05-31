// Documentación para subfilas: https://datatables.net/examples/api/row_details_stateSave.html

let dataTable;
let dataTableIsInitialized = false;
let matriz = { data: [] };

async function buildTableISI(result, options, withSubTable = false) {

  if (dataTableIsInitialized) dataTable.destroy();

  const columns = generateTable(result, options.idContainer, options.id, options.name, withSubTable);

  if (withSubTable) {
    localStorage.setItem(`matrizForTbl-${options.id}`, JSON.stringify(matriz));

    dataTable = $(`#${options.id}`).DataTable({
      "ajax": function (data, callback, settings) {
        callback(
          matriz
        );
      },
      rowId: 'ID',
      stateSave: true,
      columns,
      order: [[1, 'asc']],
    });
    const elInterest = document.querySelectorAll(`#${options.id} .dt-control`)
    elInterest.forEach(el => {
      el.addEventListener('click', function (event) {
        if (event.target.matches('tbody td.dt-control')) {
          var tr = event.target.closest('tr');
          var row = dataTable.row(tr);

          if (row.child.isShown()) {
            row.child.hide();
          } else {
            if (typeof options.funcSubTable === 'function') {
              row.child(options.funcSubTable(row.data())).show();
            } else {
              console.error(`Function ${options.funcSubTable} is not defined`);
            }
          }
        }
      })
    })
  } else {
    dataTable = $(`#${options.id}`).DataTable(options.config);
  }

  dataTableIsInitialized = true;
};

const generateTable = (result, idContainer, idiISITable, nameISITable, withSubTable) => {
  const tableContainer = document.getElementById(idContainer);
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
    if (withSubTable && header.split('|')[1] == 'noHeader') {
    } else {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Crear el cuerpo de la tabla
  if (!withSubTable) {
    const tbody = document.createElement("tbody");
    clientsToShow.forEach(client => {
      const row = document.createElement("tr");
      Object.keys(client).forEach(key => {
        const column = document.createElement("td");
        if (client[key].split('|')[1] == 'freeText') {
          column.textContent = client[key].split('|')[0]
        } else if (client[key].split('|')[1] == 'freeButton') {
          const button = document.createElement("button");
          button.textContent = client[key].split('|')[0];
          if (client[key].split('|')[2] != 'noClass') {
            const classes = client[key].split('|')[2].split(" ");
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
      })

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
  } else {
    const columnForRows = [{
      className: 'dt-control',
      orderable: false,
      data: null,
      defaultContent: '',
    }]
    clientsToShow.forEach((row, index) => {
      // console.log(row)
      const obj = {}
      Object.keys(row).forEach((key, indexKey) => {
        obj[key] = row[key].split('|')[0];
        if (row[key].split('|')[1] == 'freeText' && index == 0) {
          columnForRows.push({ data: key })
        }
      })
      matriz.data.push(obj)
    })

    tableContainer.innerHTML = ""; // Limpiar el contenedor antes de insertar la nueva tabla
    tableContainer.appendChild(table);

    console.log({ columnForRows })
    return columnForRows;
    // resolve(columnForRows)
  }

  // Insertar la tabla en el contenedor
  tableContainer.innerHTML = ""; // Limpiar el contenedor antes de insertar la nueva tabla
  tableContainer.appendChild(table);
};

export { buildTableISI }