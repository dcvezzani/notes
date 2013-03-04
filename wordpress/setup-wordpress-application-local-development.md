install MySql on OSX (Mountain Lion)
==================================================================

1. brew install mysql on mac os
1. set a password for 'root' mysql user (http://stackoverflow.com/questions/4359131/brew-install-mysql-on-mac-os)


How to reset MySQL root password.
phpMyAdmin will require a password be used to log in (http://askubuntu.com/questions/156280/1045-cannot-log-in-to-the-mysql-server)


install phpMyAdmin on OSX (Mountain Lion)
==================================================================

Installing phpMyAdmin on Mac OSX 10.8 Mountain Lion & 10.7, 10.6 (http://www.coolestguyplanettech.com/installing-phpmyadmin-on-mac-osx-10-7-lion/)


create a database and username for the new application
==================================================================

Store some environment variables; what's the name of your site?

```
export my_site=dcvtest
export my_db_password=<your-database-password>
```

Escaping the exclamation mark ('!').  
Concatenates the rest of the string with the exclamation mark, escaped in single ticks:

```
"'!'"

e.g., 
from: echo "my!@#$password"
to:   echo "my"'!'"@#$password"
```

Cache the sudo password (so we don't have to enter it over and over again)

```
sudo ls
```

Create a database and database user.

```
# e.g., 
# CREATE DATABASE wp_junk;
# GRANT ALL PRIVILEGES ON wp_junk.* TO "wp_junk_adm"@"localhost" IDENTIFIED BY "pass13!#";
# FLUSH PRIVILEGES;

# sudo mysql -uroot -p -e "DROP DATABASE wp_${my_site};"
sudo mysql -uroot -p -e "CREATE DATABASE wp_${my_site}; GRANT ALL PRIVILEGES ON wp_$my_site.* TO \"wp_${my_site}_adm\"@\"localhost\" IDENTIFIED BY \"${my_db_password}\"; FLUSH PRIVILEGES; "

sudo mysql -uwp_${my_site}_adm -p
```



create new (blank) wordpress application
==================================================================

Using supplied config/environments/development.php

```
mkdir $my_site && cd $my_site && curl -L get.wbp.io | sh && sh -c "echo \"\n\\\$WP_ENVIRONMENT = array(\n\t'db_name' => 'wp_${my_site}',\n\t'db_user' => 'wp_${my_site}_adm',\n\t'db_password' => '${my_db_password}',\n\t'db_host' => 'localhost',\n\t'wp_lang' => '',\n\t'wp_debug' => true,\n\t'name' => 'development'\n);\n?>\" >> config/environments/development.php" && sh -c "echo \"<virtualhost *:80>\n ServerName ${my_site}.wordpress.dev\n ServerAlias www.${my_site}.wordpress.dev\n DocumentRoot \\\"/Users/davidvezzani/Sites/wordpress/${my_site}\\\"\n\n <directory \\\"/Users/davidvezzani/Sites/wordpress/${my_site}\\\">\n  Options Indexes FollowSymLinks\n  AllowOverride All\n  Order allow,deny\n  Allow from all\n </directory>\n</virtualhost>\" > ../conf/${my_site}.conf" && sudo sh -c "echo \"\n127.0.0.1 ${my_site}.wordpress.dev\n127.0.0.1 www.${my_site}.wordpress.dev\" >> /private/etc/hosts" && sudo apachectl graceful && mvim config/environments/development.php 

open http://${my_site}.wordpress.dev
```

Using my own config/environments/development.php

```
mkdir $my_site && cd $my_site && curl -L get.wbp.io | sh && sh -c "echo \"<?php\n\\\$dev_server = preg_replace('/:.*/',\\\"\\\", \\\$_SERVER['HTTP_HOST']);\n\ndefine('WP_SITEURL', \\\"http://\\\$dev_server\\\");\ndefine('WP_HOME', \\\"http://\\\$dev_server\\\");\n\n\\\$WP_ENVIRONMENT = array(\n  'db_name' => 'wp_${my_site}',\n  'db_user' => 'wp_${my_site}_adm',\n  'db_password' => '${my_db_password}',\n  'db_host' => 'localhost',\n  'wp_lang' => '',\n  'wp_debug' => true,\n  'name' => 'development'\n);\n?>\" > config/environments/development.php" && sh -c "echo \"<virtualhost *:80>\n ServerName ${my_site}.wordpress.dev\n ServerAlias www.${my_site}.wordpress.dev\n DocumentRoot \\\"/Users/davidvezzani/Sites/wordpress/${my_site}\\\"\n\n <directory \\\"/Users/davidvezzani/Sites/wordpress/${my_site}\\\">\n  Options Indexes FollowSymLinks\n  AllowOverride All\n  Order allow,deny\n  Allow from all\n </directory>\n</virtualhost>\" > ../conf/${my_site}.conf" && sudo sh -c "echo \"\n127.0.0.1 ${my_site}.wordpress.dev\n127.0.0.1 www.${my_site}.wordpress.dev\" >> /private/etc/hosts" && sudo apachectl graceful && mvim config/environments/development.php

open http://${my_site}.wordpress.dev
```


archive
==================================================================

```
# general mysql queries from the command line
# sudo mysql -uroot -p -D DATABASENAME -e "CREATE DATABASE 'wp_${my_site}';" > output.txt 
#
# http://stackoverflow.com/questions/9462416/shell-one-line-query
```
