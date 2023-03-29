import * as sql from "./sql.js";

/**
 * @param {string} inicial - Palabla o letra con la que inicia el id
 *  
 * @funcion Generar id alfanumerico
 * 
 * @Resultados
 * Id alfanumerico
 */
const generateId = (inicial) => {
    inicial = typeof inicial === "undefined" ? "z" : inicial;
    return `${inicial}-${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * @param {date} fechaNacimiento - Fecha nacimiento
 * @param {date} fechaFinal - Fecha hasta la que se quiere calcular la edad
 *  
 * @funcion Indicar la edad de la persona
 * 
 * @Resultados
 * Edad
 */
const calcularEdad = (fechaNacimiento, fechaFinal) => {
    var MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425;
    var edad = Math.floor((fechaFinal.getTime() - fechaNacimiento.getTime()) / MS_PER_YEAR);
    return edad;
}

/**
 * @param {date} fechaInicial
 * @param {date} fechaFinal
 *  
 * @funcion Contar días entre dos fechas
 * 
 * @Resultados
 * Numero de días entre una fecha y otra incluyendo decimales
 */

const calcularDiasEntreFechas = (fechaInicial, fechaFinal) => {
    var dias = (fechaFinal - fechaInicial) / (1000 * 3600 * 24) + 1;
    return dias;
}

/**
 * @param {date} fechaInicial
 * @param {date} fechaFinal
 *  
 * @funcion Contar días entre dos fechas con años de 360 días, se usa para calculos de nomina y seguridad social
 * 
 * @Resultados
 * Numero de días entre una fecha
 */

function calcularDiasEntreFechasYear360Dias(fechaInicial, fechaFinal) {
    fechaInicial = new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), fechaInicial.getDate(), 0, 0, 0);
    fechaFinal = new Date(fechaFinal.getFullYear(), fechaFinal.getMonth(), fechaFinal.getDate(), 0, 0, 0);
    const getYearFechaInicio = fechaInicial.getFullYear();
    const getMonthFechaInicio = fechaInicial.getMonth() + 1;
    const getdayFechaInicio = fechaInicial.getDate();
    const getYearFechaFinal = fechaFinal.getFullYear();
    const getMonthFechaFinal = fechaFinal.getMonth() + 1;
    const getdayFechaFinal = fechaFinal.getDate();
    var dias = (((getYearFechaFinal - getYearFechaInicio) * 360) + ((getMonthFechaFinal - getMonthFechaInicio) * 30) + (getdayFechaFinal - getdayFechaInicio)) + 1;
    return dias;
}

/**
 * @param {date} fecha
 *  
 * @funcion Obtener la fecha del ultimo día del mes en curso
 * 
 * @Resultados
 * Ultimo día del mes determinada fecha
 */

const getUltimoDiaMes = (fecha) => {
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0, 0, 0, 0);
}

/**
 *  
 * @funcion suma los valores de una matriz cuando se usa reduce
 * 
 * @ejemplo
 * [1,2].reduce(sumeArr) = 3
 */

const sumeArr = (total, value, index, array) => {
    return Number(total) + Number(value);
}

/**
 * @param {date} fecha
 *  
 * @funcion Cuando recibe una fecha con formato javaScript la convierte a formato SQL
 * 
 * @ejemplo
 * si se pasa 2023-01-01T22:09:13.195Z (javaScript) la función devuelve 2023-01-01 17:09:13
 */

const fechaJsToSql = (fecha) => {
    // console.log(fecha)
    const mes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const minutosSegundos = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
    // console.log(fecha.getFullYear() + "-" + mes[fecha.getMonth()] + "-" + dias[fecha.getDate() - 1] + " " + horas[fecha.getHours()] + ":" + minutosSegundos[fecha.getMinutes()] + ":" + minutosSegundos[fecha.getSeconds()])
    return fecha.getUTCFullYear() + "-" + mes[fecha.getUTCMonth()] + "-" + dias[fecha.getUTCDate() - 1] + " " + horas[fecha.getUTCHours()] + ":" + minutosSegundos[fecha.getUTCMinutes()] + ":" + minutosSegundos[fecha.getUTCSeconds()];
}

/**
 * @param {date} fechaInicio
 * @param {integer} numDias
 * @param {array} diasNoHabilesArr - es una matriz de días que no se deben tener en cuenta
 *  
 * @funcion Devuelve la fecha del día habil buscado
 * 
 */

const buscarDiaHabil = (fechaInicio, numDias, diasNoHabilesArr) => {
    diasNoHabilesArr = typeof diasNoHabilesArr === "undefined" ? [] : diasNoHabilesArr;
    let contadorDias = 1;
    while (numDias != 0) {
        if (diasNoHabilesArr.indexOf(fechaInicio.toString()) === -1) {
            fechaInicio.setDate(fechaInicio.getDate() + contadorDias);
            numDias = --numDias;
        } else {
            fechaInicio.setDate(fechaInicio.getDate() + contadorDias);
        }
        contadorDias = contadorDias++;
    }
    return fechaInicio;
}
/**

Espera un tiempo determinado antes de resolver la promesa.
@param {number} time - El tiempo en milisegundos que se desea esperar.
@returns {Promise<string>} - Una promesa que se resuelve con el mensaje "Tiempo completado" después del tiempo especificado.
*/

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(() => resolve("Tiempo completado"), time);
    });
}

/**
  Convierte un string en formato UTF-8 a una cadena Unicode.
 
  @param {string} utfString - El string en formato UTF-8 a convertir.
  @returns {string} La cadena Unicode correspondiente al string en formato UTF-8.
 
*/

function utf8ToAnsi(string) {
    return string
        .replaceAll(/Â¡\b/g, '¡')
        .replaceAll(/Â¢\b/g, '¢')
        .replaceAll(/Â£\b/g, '£')
        .replaceAll(/Â¤\b/g, '¤')
        .replaceAll(/Â¥\b/g, '¥')
        .replaceAll(/Â¦\b/g, '¦')
        .replaceAll(/Â§\b/g, '§')
        .replaceAll(/Â¨\b/g, '¨')
        .replaceAll(/Â©\b/g, '©')
        .replaceAll(/Âª\b/g, 'ª')
        .replaceAll(/Â«\b/g, '«')
        .replaceAll(/Â¬\b/g, '¬')
        .replaceAll(/Â®\b/g, '®')
        .replaceAll(/Â¯\b/g, '¯')
        .replaceAll(/Â°\b/g, '°')
        .replaceAll(/Â±\b/g, '±')
        .replaceAll(/Â²\b/g, '²')
        .replaceAll(/Â³\b/g, '³')
        .replaceAll(/Â´\b/g, '´')
        .replaceAll(/Âµ\b/g, 'µ')
        .replaceAll(/Â¶\b/g, '¶')
        .replaceAll(/Â·\b/g, '·')
        .replaceAll(/Â¸\b/g, '¸')
        .replaceAll(/Â¹\b/g, '¹')
        .replaceAll(/Âº\b/g, 'º')
        .replaceAll(/Â»\b/g, '»')
        .replaceAll(/Â¼\b/g, '¼')
        .replaceAll(/Â½\b/g, '½')
        .replaceAll(/Â¾\b/g, '¾')
        .replaceAll(/Â¿\b/g, '¿')
        .replaceAll(/Ã€\b/g, 'À')
        .replaceAll(/Ã\b/g, 'Á')
        .replaceAll(/Ã‚\b/g, 'Â')
        .replaceAll(/Ãƒ\b/g, 'Ã')
        .replaceAll(/Ã„\b/g, 'Ä')
        .replaceAll(/Ã…\b/g, 'Å')
        .replaceAll(/Ã†\b/g, 'Æ')
        .replaceAll(/Ã‡\b/g, 'Ç')
        .replaceAll(/Ãˆ\b/g, 'È')
        .replaceAll(/Ã‰\b/g, 'É')
        .replaceAll(/ÃŠ\b/g, 'Ê')
        .replaceAll(/Ã‹\b/g, 'Ë')
        .replaceAll(/ÃŒ\b/g, 'Ì')
        .replaceAll(/Ã\b/g, 'Í')
        .replaceAll(/ÃŽ\b/g, 'Î')
        .replaceAll(/Ã\b/g, 'Ï')
        .replaceAll(/Ã\b/g, 'Ð')
        .replaceAll(/Ã‘\b/g, 'Ñ')
        .replaceAll(/Ã’\b/g, 'Ò')
        .replaceAll(/Ã“\b/g, 'Ó')
        .replaceAll(/Ã”\b/g, 'Ô')
        .replaceAll(/Ã•\b/g, 'Õ')
        .replaceAll(/Ã–\b/g, 'Ö')
        .replaceAll(/Ã—\b/g, '×')
        .replaceAll(/Ã˜\b/g, 'Ø')
        .replaceAll(/Ã™\b/g, 'Ù')
        .replaceAll(/Ãš\b/g, 'Ú')
        .replaceAll(/Ã›\b/g, 'Û')
        .replaceAll(/Ãœ\b/g, 'Ü')
        .replaceAll(/Ã\b/g, 'Ý')
        .replaceAll(/Ãž\b/g, 'Þ')
        .replaceAll(/ÃŸ\b/g, 'ß')
        .replaceAll(/Ã\b/g, 'à')
        .replaceAll(/Ã¡\b/g, 'á')
        .replaceAll(/Ã¢\b/g, 'â')
        .replaceAll(/Ã£\b/g, 'ã')
        .replaceAll(/Ã¤\b/g, 'ä')
        .replaceAll(/Ã¥\b/g, 'å')
        .replaceAll(/Ã¦\b/g, 'æ')
        .replaceAll(/Ã§\b/g, 'ç')
        .replaceAll(/Ã¨\b/g, 'è')
        .replaceAll(/Ã©\b/g, 'é')
        .replaceAll(/Ãª\b/g, 'ê')
        .replaceAll(/Ã«\b/g, 'ë')
        .replaceAll(/Ã¬\b/g, 'ì')
        .replaceAll(/Ã­\b/g, 'í')
        .replaceAll(/Ã®\b/g, 'î')
        .replaceAll(/Ã¯\b/g, 'ï')
        .replaceAll(/Ã°\b/g, 'ð')
        .replaceAll(/Ã±\b/g, 'ñ')
        .replaceAll(/Ã²\b/g, 'ò')
        .replaceAll(/Ã³\b/g, 'ó')
        .replaceAll(/Ã´\b/g, 'ô')
        .replaceAll(/Ãµ\b/g, 'õ')
        .replaceAll(/Ã¶\b/g, 'ö')
        .replaceAll(/Ã·\b/g, '÷')
        .replaceAll(/Ã¸\b/g, 'ø')
        .replaceAll(/Ã¹\b/g, 'ù')
        .replaceAll(/Ãº\b/g, 'ú')
        .replaceAll(/Ã»\b/g, 'û')
        .replaceAll(/Ã¼\b/g, 'ü')
        .replaceAll(/Ã½\b/g, 'ý')
        .replaceAll(/Ã¾\b/g, 'þ')
        .replaceAll(/Ã¿\b/g, 'ÿ')
}
async function renameFile(oldName, newName) {
    return new Promise((resolve, reject) => {
        const rename = fs.rename(oldName, newName, () => { });
        if (!rename) resolve(console.log("resolve"));
    });
};

/**
  Obtiene el nombre del archivo descargado de una respuesta HTTP en una página Puppeteer.

  @param {Page} page - Página de Puppeteer.
*/
const getFileName = async (page) => {
    return new Promise((resolve, reject) => {
        page.on("response", (response) => {
            let localFileName;
            // console.log(response.headers());
            localFileName = response
                .headers()
            ["content-disposition"]?.split(";", 2)[1]
                .split("=")[1]
                .trimStart();
            if (!localFileName) {
                reject(new Error("No se encontro el nombre"));
            } else {
                resolve(localFileName);
            }
        });
    });
};

/**
  Espera a que un archivo dado exista en el sistema de archivos.
  @param {string} filename - El nombre del archivo que se espera que exista.
 */
async function waitFile(filename) {
    return new Promise(async (resolve, reject) => {

        if (!fs.existsSync(filename)) {
            console.log("El archivo no se ha encontrado, esperando...");
            await delay(1000);
            await waitFile(filename);
            resolve();
        } else {
            console.log("El archivo ha sido encontrado");
            resolve();
        }
    }

    );
}
/**
 * Divide un archivo PDF en varios archivos PDF más pequeños, de acuerdo con el tamaño especificado.
 *
 * @async
 * @param {number} rango - El tamaño máximo de cada archivo PDF resultante.
 * @param {string} docNameWithPath - La ruta completa y el nombre del archivo PDF a dividir.
 * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto con dos propiedades: 'bigDoc', que indica si el archivo PDF original tenía más de 20 páginas, y 'arrDocNames', que es un array con los nombres de archivo de los PDFs resultantes.
 */
function pdfSpliter(rango, docNameWithPath) {
    return new Promise(async (resolve, reject) => {

        try {
            const pdfOriginal = fs.readFileSync(docNameWithPath)
            const pdfDoc = await PDFDocument.load(pdfOriginal)
                .catch(t => reject(t))
            const numP = pdfDoc.getPages()

            let numPages = numP.length
            let control = 0
            let controlPages = numPages
            let arrDocNames = []
            let bigDoc = false
            if (numPages > 20) {
                bigDoc = true
                console.log('El documento con mas de 20 paginas');
                do {
                    let arrRrango = []

                    if (controlPages >= rango) {

                        for (let i = 0; i < rango; i++) {

                            arrRrango.push(control)
                            control++

                        }
                        controlPages = controlPages - rango
                    } else {
                        for (let i = 0; i < numPages; i++) {
                            if (i == 0) {
                                i = control
                            }
                            arrRrango.push(i)
                            controlPages = controlPages - controlPages
                            control++
                        }
                    }

                    // Create a new PDFDocument
                    const newPdf = await PDFDocument.create()
                    // Load a PDFDocument from the existing PDF bytes
                    const pages = await newPdf.copyPages(pdfDoc, arrRrango)

                    for (const key in pages) {
                        newPdf.addPage(pages[key])
                    }
                    // const pdfBytes = await newPdf.save()
                    const pdfBytes = await newPdf.save()
                    fs.writeFileSync(`./controllers/doc/pdfCortado${control}.pdf`, pdfBytes)
                    console.log('Documeto dividido con exito');
                    arrDocNames.push(`pdfCortado${control}.pdf`)
                } while (controlPages > 0);
            }

            resolve({
                bigDoc: bigDoc,
                arrDocNames: arrDocNames
            })

        } catch (error) {
            console.log('****************Error SPliter ******************************');
            console.log(error);
            reject(error)
        }

    })

}

/**
Lee los nombres de los archivos en una carpeta especificada.
@param {string} folderPath - La ruta de la carpeta a leer.
@returns {Promise<string[]>} Un arreglo con los nombres de los archivos en la carpeta.
*/
async function getNameDocs(folderPath) {
    return new Promise((resolve, reject) => {
        readdir(folderPath, (err, files) => {
            if (err) {
                console.log('Error al leer la carpeta:', err);
                return;
            }
            resolve(files);
        });
    })
}

export {
    renameFile,
    getFileName,
    waitFile,
    generateId,
    calcularEdad,
    calcularDiasEntreFechas,
    calcularDiasEntreFechasYear360Dias,
    getUltimoDiaMes,
    sumeArr,
    fechaJsToSql,
    buscarDiaHabil,
    delay,
    utf8ToAnsi,
    pdfSpliter,
    getNameDocs
}