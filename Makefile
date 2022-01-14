.PHONY: install
install:
	@npm install
	@cd templates && npm install

.PHONY: build
build:
	@npm run build

.PHONY: test
test:
	@npm run test

.PHONY: docker-compose
docker-compose:
	@docker-compose down
	@docker-compose up -d

.PHONY: blog-template
blog-template:
	@cd templates && npm run blog

