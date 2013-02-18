System updates
====

```
# install homebrew
# http://mxcl.github.com/homebrew/

# install Ruby-compatible gcc compiler
# https://gist.github.com/zenkay/3237860
brew update
brew tap homebrew/dupes
brew install apple-gcc42
```


RVM
====

```
# install RVM
\curl -L https://get.rvm.io | bash -s stable --rails

# verify good install
# verify desired version of Ruby is installed

# the install of RVM as indicated above should include the Rails and Bundler gems
```


Github
====

```
# create an account if you don't already have one

# generate ssh-keys if you don't already have them
ssh-keygen -t rsa -C "your_email@youremail.com"

# add ssh public key to account
```


Heroku
====

```
# create an account if you don't already have one

# add ssh public key to account
```


PostgreSQL
====

```
# install using homebrew
# http://www.mikeball.us/blog/setting-up-postgres-on-mac-osx-with-homebrew
# http://russbrooks.com/2010/11/25/install-postgresql-9-on-os-x
# http://www.cyberciti.biz/faq/postgresql-remote-access-or-connection/
# http://www.sd-kyber.com/library/onlineNotes/psqlOSX.html
brew install postgresql

# follow the directions printed out at the end of the homebrew installation
# they will include the particular values on your computer that may or may not
# match up with those listed in personal blogs on the Internet
# those instructions should look similar to the 'www.mikeball.us' url listed above

# make the directory where the default database will reside for PostgreSQL
sudo mkdir -p /usr/local/var/postgres
sudo chown <your-username>:admin /usr/local/var/postgres/

# initialize the default database
initdb /usr/local/var/postgres/data

# tweak PostgreSQL configuration
# http://stackoverflow.com/questions/11980017/trying-to-setup-postgres-on-osx
# open your postgresql.conf file (e.g., /usr/local/var/postgres/postgresql.conf)
# and edit accordingly
unix_socket_directory = '/var/pgsql_socket'    # dont worry if yours is different
#unix_socket_group = ''                        # default is fine here
unix_socket_permissions = 0777                 # check this one

# don't put PostreSQL auto-launcher in the LaunchAgents directory until you have tested 
# that the PostgreSQL server starts up and runs successfully
pg_ctl -D /usr/local/var/postgres/data -l /usr/local/var/postgres/data/server.log start

# verify the server is running
# the server should have been installed under your OSX log-in username
psql -l
psql -d postgres -U michaelvezzani

# stop the PostgreSQL server
pg_ctl -D /usr/local/var/postgres/data -l /usr/local/var/postgres/data/server.log stop

# configure PostreSQL to automatically start up when rebooting the computer
cp /usr/local/Cellar/postgresql/9.1.4/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.postgres.plist

# troubleshooting
# http://stackoverflow.com/questions/13119392/postgresql-could-not-connect-to-server
# http://stackoverflow.com/questions/2370525/default-database-named-postgres-on-postgresql-server
# http://alvinalexander.com/blog/post/postgresql/log-in-postgresql-database

# install the front-end, admin GUI
# http://www.crosstown.coolestguyplanettech.com/22-database/28-installing-postgresql-on-os-x-lion-107
```


Rubygems update
====

```
# it may be necessary to install some gems manually instead of through Bundler
# http://stackoverflow.com/questions/13108299/error-installing-debugger-linecache-error-failed-to-build-gem-native-extension
gem install debugger-linecache -v '1.1.2' -- --with-ruby-include=$rvm_path/src/ruby-1.9.3-p286/
```


Get started
====

```
# create or clone a Rails project
rails new <project-name>
- or -
git clone git@github.com:<user-name>/<project-name>.git

cd <project-name>
bundle
bundle install --binstubs

# create config/database.yml
development:
  adapter: postgresql
  database: <db-name>_development
  username: <user-name>
  password: <password>
  encoding: utf8
  pool: 5
 
test: 
  adapter: postgresql
  database: <db-name>_test
  username: <user-name>
  password: <password>
  encoding: utf8
  pool: 5

# initialize database for Rails project
./bin/rake db:migrate db:migrate:status

# start up the application
./bin/rails s -p <rails-app-port>
open http://localhost:<rails-app-port>
```


Developer Pluses
====

```
# bash autocomplete

# MacVim
# Vim plug-ins
```

