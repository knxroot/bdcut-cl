# Script para generar archivos en diferentes formatos

## Modo de uso

```node csv_to_sql.js rutaAlArchivoConFormato [rutaOutput] [rutaCSV]```

Ejemplo: ```node csv_to_sql.js formatos/postgres.json postgres.sql ../BD/CSV_utf8/BDCUT_CL__CSV_UTF8.csv```

## TODO

* Documentación
* Más formatos
* Mejorar manejo de errores


##Instalar NODEJS
Linux Ubuntu 

 curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
 sudo apt-get install -y nodejs
 
##Generar madiante comando make

cd bdcut-cl/SCRIPT/
make 

luego podrá encontrar los archivos en el directorio ../BD correspondiente. 
