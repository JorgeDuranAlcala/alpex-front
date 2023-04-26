sudo chmod 777 /var/www/api-alpex

sudo cp /var/www/.env.front /var/www/new-front-dynamic-copy/.env
cd /var/www/new-front-dynamic-copy
node -v
yarn install
yarn build
