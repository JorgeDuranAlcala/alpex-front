#!/bin/bash
sudo rm -r /var/www/new-front-data/build/*
sudo cp -R /var/www/new-front-data-copy/build/* /var/www/new-front-data/build
sudo service nginx restart
# sudo rm -r /var/www/new-front-data-copy
