.PHONY: setup
setup:
	rm -rf submodule/Recipes
	rm -rf public/recipes
	npm install
	git submodule update --init --recursive


.PHONY: clean
clean:
	rm -rf submodule/Recipes
	rm -rf public/recipes

.PHONY: pull
pull: 
	git submodule update --init --recursive

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
	npm install
	git submodule update --init --recursive
	node convert.js
# # npm run build
# 	git checkout gh-pages
# 	git pull origin gh-pages
# 	rm -rf *  # Remove old content
# 	cp -r dist/* .  # Copy new build files
# 	git add -A
# 	git commit -m "Deploy to GitHub Pages"
# 	git push origin gh-pages
# 	git checkout main  # Go back to the main branch