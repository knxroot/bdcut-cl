# bdcut-cl: MYSQL5 INNODB UTF-8 Versión

- Web         : https://github.com/knxroot/bdcut-cl
- Autor       : Gustavo Lacoste <gustavo@lacosox.org> , Danilo Lacoste <danilo@lacosox.org>
- Fecha       : Sun, 18 Sep 2011 01:39:24 -0400
- Revisión    : Revision: 01
- Licencia    : GPLV3
- Descripción : Base de datos para MySQL 5 de los códigos territoriales Chilenos

## Requisitos

1.- MySQL 5 o superior, con soporte para InnoDB

# Instalación

El Archivo SQL puede importarse directamente a tu Base de datos de la siguiente forma:

a) cree la Base de datos donde importará los datos:

`create database BDCUTCL`

b) importe el script:

`mysql -U usuario BDCUTCL < BDCUT_CL_MYSQL5_INNODB_UTF8.sql`

## Ejemplos de Uso

1.- Seleccionar todas las comunas de la Región de la Araucanía

    SELECT
    	COMUNA_NOMBRE,
    	REGION_NOMBRE
    FROM
    	region inner join
    	provincia on REGION_ID = PROVINCIA_REGION_ID inner join
    	comuna on PROVINCIA_ID = COMUNA_PROVINCIA_ID
    WHERE
    	REGION_ID = 9
    ORDER BY COMUNA_NOMBRE

2.- Cantidad de Comunas por Región

    SELECT
    	COUNT( COMUNA_ID ) ,
    	REGION_NOMBRE
    FROM
    	region INNER JOIN
    	provincia ON REGION_ID = PROVINCIA_REGION_ID INNER JOIN
    	comuna ON PROVINCIA_ID = COMUNA_PROVINCIA_ID
    GROUP BY REGION_ID
    ORDER BY REGION_ID