
deploy:
	rm -rf submodule/Recipes
	rm -rf public/recipes
	npm install
	git submodule update --init --recursive
	npm run build
	git checkout gh-pages
	git pull origin gh-pages
	rm -rf *  # Remove old content
	cp -r dist/* .  # Copy new build files
	git add -A
	git commit -m "Deploy to GitHub Pages"
	git push origin gh-pages
	git checkout main  # Go back to the main branch

.PHONY: deploy

setup:
	rm -rf submodule/Recipes
	rm -rf public/recipes
	npm install
	git submodule update --init --recursive

clean:
	rm -rf submodule/Recipes
	rm -rf public/recipes

pull: 
	git submodule update --init --recursive

convert: 
	node convert.js

dev:
	npm run dev
