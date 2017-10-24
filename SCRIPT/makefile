default: all

all: postgresql mysql

postgresql: formatos/postgres.json
	node csv_to_sql.js formatos/postgres.json ../BD/PosgreSQL_utf8/BDCUT_CL__PosgreSQL_utf8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
mysql: formatos/mysql.json
	node csv_to_sql.js formatos/mysql.json ../BD/MySQL5_InnoDB_utf8/BDCUT_CL__MYSQL5_INNODB_UTF8__generado.sql ../BD/CSV_utf8BDCUT_CL__CSV_UTF8.csv
	
clean:
	$(RM) ../BD/PosgreSQL_utf8/BDCUT_CL__PosgreSQL_utf8__generado.sql
	$(RM) ../BD/MySQL5_InnoDB_utf8/BDCUT_CL__MYSQL5_INNODB_UTF8__generado.sql
	
