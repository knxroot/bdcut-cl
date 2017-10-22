/**
*   Script para generación automática de archivos sql
*   ## Modo de uso
* 
*  node index.js rutaAlArchivoConFormato [rutaOutput] [rutaCSV]
* 
*  Ejemplo: node index.js formatos/postgres.json postgres.sql
*/
const fs = require('fs')
const path = require('path')
const readline = require('readline')

let formatPath = process.argv[2]

if (!formatPath) {
    console.log('Faltó especificar la ruta del archivo con el formato')
    process.exit(-1)
}

if (!fs.existsSync(formatPath)) {
    console.log('El archivo con el formato no existe')
    process.exit(-2)
}

let outputPath = process.argv[3] || 'output.txt'
let csvPath = path.resolve(__dirname, '../BD/CSV_utf8/BDCUT_CL__CSV_UTF8.csv' || process.argv[4])

new Promise(resolve => {

    console.log('Leyendo archivo CSV...')

    let inputStream = fs.createReadStream(csvPath)
    let lineReader = readline.createInterface({
        input: inputStream
    })
    let container = {
        regiones: {},
        provincias: {},
        comunas: {}
    }
    let header = true

    lineReader.on('line', function (line) {

        if (header) {
            header = false
            return
        }

        let [comunaName, comunaId, provinciaName, provinciaId, regionName, regionId] = line.split(',')
        let { regiones, provincias, comunas } = container

        if (!regiones[regionId]) {
            regiones[regionId] = {
                id: regionId,
                name: regionName
            }
        }

        if (!provincias[provinciaId]) {
            provincias[provinciaId] = {
                id: provinciaId,
                name: provinciaName,
                regionId,
                regionName
            }
        }

        comunas[comunaId] = {
            id: comunaId,
            name: comunaName,
            provinciaId,
            provinciaName,
            regionId,
            regionName
        }

    })

    inputStream.on('end', () => {
        lineReader.close()
        inputStream.close()
        console.log('Archivo CSV leído con éxito...')
        resolve(container)
    })

}).then(container => {

    console.log('Creando archivo a partir del formato...')

    let format = require(path.resolve(__dirname, formatPath))
    let outputStream = fs.createWriteStream(outputPath)
    let replaceVariableRegex = /\$\{(.*?)\}/g
    let replaceInfoRegex = /\$\{_(.*?)\}/g

    let replaceWith = (string, variables, replaceRegex) => string.replace(replaceRegex, (match, variable) => variables[variable])
    let replaceWithVariables = string => replaceWith(string, format.variables, replaceVariableRegex)
    let replaceWithInfo = null

    if (format.escape) {
        let escapeRegex = new RegExp(Object.keys(format.escape).join('|'), 'g')
        let escape = string => string.replace(escapeRegex, key => format.escape[key])
        replaceWithInfo = (string, info) => {
            info = Object.assign({}, info)
            info.name = escape(info.name)
            return replaceWith(string, info, replaceInfoRegex)
        }
    } else {
        replaceWithInfo = (string, info) => replaceWith(string, info, replaceInfoRegex)
    }

    if (format.pre) {
        format.pre.forEach(v => {
            outputStream.write(replaceWithVariables(v) + '\n', 'utf8')
        })
    }

    outputStream.write('\n')

    for (let division of ['regiones', 'provincias', 'comunas']) {
        if (format[division]) {
            for (let id in container[division]) {
                outputStream.write(replaceWithVariables(replaceWithInfo(format[division], container[division][id])) + '\n', 'utf8')
            }
        }
        outputStream.write('\n')
    }

    if (format.post) {
        format.post.forEach(v => {
            outputStream.write(replaceWithVariables(v) + '\n', 'utf8')
        })
    }

    outputStream.end(null, () => {
        outputStream.close()
        console.log('Archivo creado con éxito :)')
    })

})
