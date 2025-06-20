up: docker-up
down:docker-down
restart:docker-down docker-up
init: docker-down-clear docker-pull docker-build docker-up manager-init
test: manager-test

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

manager-init: manager-composer-install manager-assets-install manager-migrations manager-seed manager-assets-dev

manager-composer-install:
	docker-compose run --rm b2bmarket-php-cli composer install

manager-assets-install:
	docker-compose run --rm b2bmarket-node npm ci

manager-assets-dev:
	docker-compose run --rm b2bmarket-node npm run build

manager-migrations:
	docker-compose run --rm b2bmarket-php-cli php artisan migrate --no-interaction

manager-seed:
	docker-compose run --rm b2bmarket-php-cli php artisan db:seed --no-interaction

manager-test:
	docker-compose run --rm b2bmarket-php-cli php artisan test
