up-prod:
	docker-compose --project-name passer_prod up -d --build
up-dev:
	docker-compose --project-name passer_dev -f docker-compose.yml -f docker-compose.dev.yml up -d --build

down-prod:
	docker-compose -p passer_prod down
down-dev:
	docker-compose -p passer_dev down

logs-dev:
	docker-compose -p passer_dev logs -f passer_frontend 
