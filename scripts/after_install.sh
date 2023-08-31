sudo chmod 777 /var/www/new-front-data-copy

sudo cp /var/www/.env.front /var/www/new-front-data-copy/.env
cd /var/www/new-front-data-copy
node -v
# yarn install
# yarn build
