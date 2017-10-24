default: all

all: postgresql mysql sqlserver plist json

postgresql: formatos/postgres.json
	node csv_to_sql.js formatos/postgres.json ../BD/PosgreSQL_utf8/BDCUT_CL__PosgreSQL_utf8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
mysql: formatos/mysql.json
	node csv_to_sql.js formatos/mysql.json ../BD/MySQL5_InnoDB_utf8/BDCUT_CL__MYSQL5_INNODB_UTF8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
sqlserver: formatos/sqlserver.json
	node csv_to_sql.js formatos/sqlserver.json ../BD/SQLServer_utf8/BDCUT_CL__SQLServer_utf8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv

plist: formatos/plist/plist_regiones.json
	node csv_to_sql.js  formatos/plist/plist_regiones.json ../BD/Plist/BDCUT_CL_Regiones__generado.plist ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
json: formatos/json/regiones.json
	node csv_to_sql.js  formatos/json/regiones.json ../BD/JSON/BDCUT_CL_Regiones__generado.json ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
clean:
	$(RM) ../BD/PosgreSQL_utf8/BDCUT_CL__PosgreSQL_utf8__generado.sql
	$(RM) ../BD/MySQL5_InnoDB_utf8/BDCUT_CL__MYSQL5_INNODB_UTF8__generado.sql
	$(RM) ../BD/SQLServer_utf8/BDCUT_CL__SQLServer_utf8__generado.sql
	$(RM) ../BD/Plist/BDCUT_CL_Regiones__generado.plist
	$(RM) ../BD/JSON/BDCUT_CL_Regiones__generado.json
