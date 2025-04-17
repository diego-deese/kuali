echo "** Creating default DB and users"

# Conectarse a MySQL y otorgar el privilegio GRANT OPTION al usuario
mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'%';"

# Permisos que pregunta prisma
mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"GRANT CREATE ROLE, GRANT OPTION, CREATE USER, ROLE_ADMIN, SYSTEM_VARIABLES_ADMIN ON *.* TO '$MYSQL_USER'@'%';"

mysql -u root -p$MYSQL_ROOT_PASSWORD --execute \
"GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, REFERENCES, EXECUTE ON *.* TO '$MYSQL_USER'@'%';"

echo "** Finished creating default DB and users"