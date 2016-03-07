# bdcut-cl
`Versión: 0.2.2 Estable`

Chile: 'Base de Datos de Códigos Únicos Territoriales Chilenos (Región, Provincia, Comuna)'. bdcut-cl es una colección que contiene los códigos y nombres territoriales chilenos en diferentes formatos para ser implementado fácilmente en Bases de datos o proyectos de desarrollo. BD_CUT es útil para implementarlo en proyectos informáticos chilenos. [Más](http://www.lacosox.org/?q=codigo_territorial_sql_Regiones_provincias_comunas_de_Chile).

### Aviso

- Observe que el decreto oficial ha asignado algunos nombres de regiones con la palabra “Región de”, mientras que para otras regiones no lo ha considerado. Este proyecto mantendrá los nombres oficiales indicados en el decreto. Revise más detalles en las discusiones sobre [Inconsistencias](https://github.com/knxroot/bdcut-cl/labels/Inconsistencias). Considere revisar también las fuentes de los datos que usa este proyecto en el archivo [REFERENCES.md](https://github.com/knxroot/bdcut-cl/blob/master/REFERENCES.md)
 
- Los cambios que podrían darse del actual proyecto de ley que se encuentra en tramitación y que crearía la XVI Región de Ñuble y las provincias de Diguillín, Punilla e Itata se discuten en [#4](https://github.com/knxroot/bdcut-cl/issues/4) y sus modificaciones en la rama [proyecto-ley-region-nuble](https://github.com/knxroot/bdcut-cl/branches).

## Instalación

- Vía [bower](http://bower.io/#getting-started) (recomendado): `bower install bdcut-cl`
- Vía [git](http://git-scm.com/docs/git-clone): `git clone git://github.com/knxroot/bdcut-cl.git`
- Vía [descarga directa](https://github.com/knxroot/bdcut-cl/archive/master.zip)


## Acerca del proyecto

Este proyecto contiene la base de datos de los códigos territoriales para Chile
(actualizados a la fecha 13/09/2011), la base de datos está basada en el último
documento oficial [MININT2010](http://www.sinim.cl/archivos/centro_descargas/modificacion_instructivo_pres_codigos.pdf) publicado por el [Sistema nacional de
información municipal chileno](http://www.sinim.cl/) el cual a su vez se basa en
el Decreto Exento Nº 817 del Ministerio del Interior, publicado en el Diario
Oficial el día 26 de marzo de 2010 .

Actualmente puedes encontrar aquí la base de datos en diversos formatos
(todos sincronizados con la única fuente de datos oficial). La base de datos es
generada por el autor, por lo tanto, este no es un proyecto oficial asociado a
alguna entidad del estado; es decir, no se da ninguna garantía, pero funciona.

#Formatos disponibles

La BD la puedes bajar en los formatos se describen en la tabla siguiente, en la carpeta de cada formato encontrarás un README que explica cómo implementar y usar el formato específico :


|     **Formato**       |     **Ideal para**   |**Integridad referencial**| **Codificación**|
|-----------------------|----------------------|--------------------------|-----------------|
| MySQL5_InnoDB_utf8    |    ``phpMyAdmin3``   |            Sí            |      UTF-8      |
| PosgreSQL_utf8        |     ``PosgreSQL``    |            Sí            |      UTF-8      |
| CSV_utf8              |``Hojas de Cálculo``  |             -            |      UTF-8      |
| SQLServer_utf8        |``SQLServer``         |            Sí            |      UTF-8      |
| Plist                 |``Property List XML`` |            Sí            |      UTF-8      |
| JSON                  |``AJAX``              |            Sí            |      UTF-8      |
| Oracle_utf8           |``Oracle PL/SQL``     |            Sí            |      UTF-8      |


#Formatos Futuros

Tenemos la idea de seguir trabajando en esto y generar nuevos formatos que faciliten el trabajo :


|     **Formato**         |     **Ideal para**   |
|-------------------------|----------------------|
| XML                     |         AJAX         |
|+Puntos Geográficos UTM  |          GIS         |


#¿Quieres aportar?


Si quieres aportar a este proyecto sólo envíanos un mensaje para agregarte al repositorio y así puedas enviar los cambios.