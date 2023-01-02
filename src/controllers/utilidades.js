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
    console.log(fecha)
    const mes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const dias = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const minutosSegundos = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
    console.log(fecha.getFullYear() + "-" + mes[fecha.getMonth()] + "-" + dias[fecha.getDate() - 1] + " " + horas[fecha.getHours()] + ":" + minutosSegundos[fecha.getMinutes()] + ":" + minutosSegundos[fecha.getSeconds()])
    return fecha.getFullYear() + "-" + mes[fecha.getMonth()] + "-" + dias[fecha.getDate() - 1] + " " + horas[fecha.getHours()] + ":" + minutosSegundos[fecha.getMinutes()] + ":" + minutosSegundos[fecha.getSeconds()];
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


export {
    generateId,
    calcularEdad,
    calcularDiasEntreFechas,
    calcularDiasEntreFechasYear360Dias,
    getUltimoDiaMes,
    sumeArr,
    fechaJsToSql,
    buscarDiaHabil
}