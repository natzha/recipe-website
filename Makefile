.PHONY: setup
setup:
	npm install
	git submodule update --init --recursive


.PHONY: clean
clean:
	rm -rf submodule/Recipes
	rm -rf public/recipes

.PHONY: pull
pull: 
	git submodule update --init --recursive

# .PHONY: build
# build:
# 	npm run build

# .PHONY: preview
# preview:
# 	npm run preview

.PHONY: convert
convert: 
	node convert.js

.PHONY: dev
dev:
	npm run dev

.PHONY: deploy
deploy:
	rm -rf submodule/Recipes
	rm -rf public/recipes
	git submodule update --init --recursive
	node convert.js
# npm run dev
