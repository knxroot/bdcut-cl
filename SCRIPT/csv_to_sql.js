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
if (process.stdout._handle) process.stdout._handle.setBlocking(true)
let header_text_pre =
    `**********************************************************
Este archivo contiene el Script de creación de la base de
datos de los códigos territoriales para Chile
SE HA GENERADO AUTOMATICAMENTE a partir de un archivo CSV
Revise la documentación para más detalle
Dirección del proyecto en GitHub:
https://github.com/knxroot/BDCUT_CL
`
let header_text_post = "************************************************************"

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
                _id: regionId,
                _name: regionName,
                provincias: []
            }
        }

        if (!provincias[provinciaId]) {
            regiones[regionId].provincias.push(provincias[provinciaId] = {
                _id: provinciaId,
                _name: provinciaName,
                _regionId: regionId,
                _regionName: regionName,
                comunas: []
            })
        }

        provincias[provinciaId].comunas.push(comunas[comunaId] = {
            _id: comunaId,
            _name: comunaName,
            _provinciaId: provinciaId,
            _provinciaName: provinciaName,
            _regionId: regionId,
            _regionName: regionName
        })

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
    let separator = format.separator ? format.separator : ''
    let regionesSeparator = format['regiones-separator'] ? format['regiones-separator'] : separator
    let provinciasSeparator = format['provincias-separator'] ? format['provincias-separator'] : separator
    let comunasSeparator = format['comunas-separator'] ? format['comunas-separator'] : separator
    let provinciasRegionSeparator = format['provincias-region-separator'] ? format['provincias-region-separator'] : separator
    let comunasProvinciaSeparator = format['comunas-provincia-separator'] ? format['comunas-provincia-separator'] : separator
    let comunasRegionSeparator = format['comunas-region-separator'] ? format['comunas-region-separator'] : separator
    let replaceVariableRegex = /\$\{(.*?)\}/g
    let replaceInfoRegex = /\$\{(_.*?)\}/g
    let lastRegion = Object.keys(container.regiones).length - 1

    let write = string => outputStream.write(string, 'utf8')
    let replaceWith = (string, variables, replaceRegex) => string.replace(replaceRegex, (match, variable) => variables[variable])
    let replaceWithVariables = string => replaceWith(string, format.variables, replaceVariableRegex)
    let replaceAndWriteArray = (array, replaceFunction) => {
        if (array) {
            array.forEach(string => {
                write(replaceFunction(string))
            })
        }
    }
    let replaceWithInfo = null
    let writeArrayWithVariables = array => replaceAndWriteArray(array, replaceWithVariables)
    let writeArrayWithInfo = (info, array) => replaceAndWriteArray(array, string => replaceWithInfo(info, string))
    let writeWithInfo = (info, stringOrArray) => {
        if(stringOrArray instanceof Array) {
            writeArrayWithInfo(info, stringOrArray)
        } else {
            write(replaceWithInfo(info, stringOrArray))
        }
    }

    if (format.escape) {
        let escapeRegex = new RegExp(Object.keys(format.escape).join('|'), 'g')
        let escape = string => string.replace(escapeRegex, key => format.escape[key])
        replaceWithInfo = (info, string) => {
            info = Object.assign({}, info)
            info._name = escape(info._name)
            return replaceWithVariables(replaceWith(string, info, replaceInfoRegex))
        }
    } else {
        replaceWithInfo = (info, string) => replaceWithVariables(replaceWith(string, info, replaceInfoRegex))
    }

    if (format.mostrar_comentarios) {
        write(format.comentarios_var_header)
        write(header_text_pre)
        writeArrayWithVariables(format.comentarios)
        write(header_text_post)
        write(format.comentarios_var_post)
    }

    writeArrayWithVariables(format.pre)
    writeArrayWithVariables(format['pre-regiones'])

    if (format.regiones) {
        let i = 0

        for (let id in container.regiones) {
            writeWithInfo(container.regiones[id], format.regiones)
            write(i++ !== lastRegion ? regionesSeparator : '')
        }
    }

    writeArrayWithVariables(format['post-regiones'])
    writeArrayWithVariables(format['pre-provincias'])

    if (format.provincias) {
        let i = 0

        for (let id in container.regiones) {
            let lastProvincia = container.regiones[id].provincias.length - 1
            let j = 0

            writeArrayWithInfo(container.regiones[id], format['pre-provincias-region'])

            for (let provincia of container.regiones[id].provincias) {
                writeWithInfo(provincia, format.provincias)
                write(j++ !== lastProvincia ? provinciasSeparator : '')
            }

            writeArrayWithInfo(container.regiones[id], format['post-provincias-region'])
            write(i++ !== lastRegion ? provinciasRegionSeparator : '')
        }
    }

    writeArrayWithVariables(format['post-provincias'])
    writeArrayWithVariables(format['pre-comunas'])

    if (format.comunas) {
        let i = 0

        for (let id in container.regiones) {
            let lastProvincia = container.regiones[id].provincias.length - 1
            let j = 0

            writeArrayWithInfo(container.regiones[id], format['pre-comunas-region'])

            for (let provincia of container.regiones[id].provincias) {
                let lastComuna = provincia.comunas.length - 1
                let k = 0

                writeArrayWithInfo(provincia, format['pre-comunas-provincia'])

                for (let comuna of provincia.comunas) {
                    writeWithInfo(comuna, format.comunas)
                    write(k++ !== lastComuna ? comunasSeparator : '')
                }

                writeArrayWithInfo(provincia, format['post-comunas-provincia'])
                write(j++ !== lastProvincia ? comunasProvinciaSeparator : '')
            }

            writeArrayWithInfo(container.regiones[id], format['post-comunas-region'])
            write(i++ !== lastRegion ? comunasRegionSeparator : '')
        }
    }

    writeArrayWithVariables(format['post-comunas'])
    writeArrayWithVariables(format.post)

    outputStream.end(null, () => {
        outputStream.close()
        console.log('Archivo creado con éxito :)')
    })

})
