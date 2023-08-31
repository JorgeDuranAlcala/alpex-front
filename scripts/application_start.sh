#!/bin/bash
sudo rm -r /var/www/new-front-dynamic/build/*
sudo cp -R /var/www/new-front-dynamic-copy/build/* /var/www/new-front-dynamic/build
sudo service nginx restart
# sudo rm -r /var/www/new-front-dynamic-copy
