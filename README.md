# Project using mongodb

## Installing Mongodb
Installing monogo db is simple  

1. add this in /etc/apt/source.list

        deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen

2. Add GPG key

        sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

3. Update the repo

        sudo apt-get update  
        sudo apt-get install mongodb-10gen  


## Creating environment for django installation

1. Install django-nonrel  
Django fork with support for NoSQL databases  

        pip install git+https://github.com/django-nonrel/django-nonrel.git

2. Install djangotoolbox  
Set of Django tools that are nonrel-compatible  

        pip install git+https://github.com/django-nonrel/djangotoolbox.git

3. Install mongodb-engine  
Set of Django tools that are nonrel-compatible  

        pip install git+https://github.com/django-nonrel/mongodb-engine

