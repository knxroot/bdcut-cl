default: all

all: postgresql mysql sqlserver plist json oracle

postgresql: formatos/postgres.json
	node csv_to_sql.js formatos/postgres.json ../BD/PosgreSQL_utf8/BDCUT_CL__PosgreSQL_utf8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
mysql: formatos/mysql.json
	node csv_to_sql.js formatos/mysql.json ../BD/MySQL5_InnoDB_utf8/BDCUT_CL__MYSQL5_INNODB_UTF8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
sqlserver: formatos/sqlserver.json
	node csv_to_sql.js formatos/sqlserver.json ../BD/SQLServer_utf8/BDCUT_CL__SQLServer_utf8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv

plist: formatos/plist/plist_regiones.json formatos/plist/plist_provinciaRegion.json formatos/plist/plist_comunaProvincia.json
	node csv_to_sql.js  formatos/plist/plist_regiones.json ../BD/Plist/BDCUT_CL_Regiones__generado.plist ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/plist/plist_provinciaRegion.json ../BD/Plist/BDCUT_CL_ProvinciaRegion__generado.plist ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/plist/plist_comunaProvincia.json ../BD/Plist/BDCUT_CL_ComunaProvincia__generado.plist ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
json: formatos/json/regiones.json formatos/json/provinciaRegion.json formatos/json/comunaProvinciaRegion.json formatos/json/comunaProvincia.json
	node csv_to_sql.js  formatos/json/regiones.json ../BD/JSON/BDCUT_CL_Regiones__generado.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/json/regiones.min.json ../BD/JSON/BDCUT_CL_Regiones__generado.min.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/json/provinciaRegion.json ../BD/JSON/BDCUT_CL_ProvinciaRegion__generado.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/json/provinciaRegion.min.json ../BD/JSON/BDCUT_CL_ProvinciaRegion__generado.min.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/json/comunaProvinciaRegion.json ../BD/JSON/BDCUT_CL_ComunaProvinciaRegion__generado.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/json/comunaProvinciaRegion.min.json ../BD/JSON/BDCUT_CL_ComunaProvinciaRegion__generado.min.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	node csv_to_sql.js  formatos/json/comunaProvincia.json ../BD/JSON/BDCUT_CL_ComunaProvincia__generado.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv	
	node csv_to_sql.js  formatos/json/comunaProvincia.min.json ../BD/JSON/BDCUT_CL_ComunaProvincia__generado.min.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv	

oracle: formatos/oracle.json
	node csv_to_sql.js formatos/oracle.json ../BD/Oracle_utf8/BDCUT_CL__Oracle_utf8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
clean:
	$(RM) ../BD/PosgreSQL_utf8/BDCUT_CL__PosgreSQL_utf8__generado.sql
	$(RM) ../BD/MySQL5_InnoDB_utf8/BDCUT_CL__MYSQL5_INNODB_UTF8__generado.sql
	$(RM) ../BD/SQLServer_utf8/BDCUT_CL__SQLServer_utf8__generado.sql
	$(RM) ../BD/Plist/BDCUT_CL_Regiones__generado.plist
	$(RM) ../BD/Plist/BDCUT_CL_ProvinciaRegion__generado.plist
	$(RM) ../BD/Plist/BDCUT_CL_ComunaProvincia__generado.plist
	$(RM) ../BD/JSON/BDCUT_CL_Regiones__generado.json
	$(RM) ../BD/JSON/BDCUT_CL_Regiones__generado.min.json
	$(RM) ../BD/JSON/BDCUT_CL_ProvinciaRegion__generado.json
	$(RM) ../BD/JSON/BDCUT_CL_ProvinciaRegion__generado.min.json
	$(RM) ../BD/JSON/BDCUT_CL_ComunaProvinciaRegion__generado.json
	$(RM) ../BD/JSON/BDCUT_CL_ComunaProvinciaRegion__generado.min.json
	$(RM) ../BD/JSON/BDCUT_CL_ComunaProvincia__generado.json
	$(RM) ../BD/JSON/BDCUT_CL_ComunaProvincia__generado.min.json
	$(RM) ../BD/Oracle_utf8/BDCUT_CL__Oracle_utf8__generado.sql
