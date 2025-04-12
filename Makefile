.PHONY: deploy
deploy:
	rm -rf submodule/Recipes
	rm -rf dist/
	npm install
	git submodule update --init --recursive
	npm run build
	git checkout gh-pages
	rm -rf .dist/
	mv dist/ .dist/
	git pull origin gh-pages
	rm -rf *
	cp -r .dist/* .  # Copy new build files
	git add -A
	git commit -m "Deploy to GitHub Pages"
	git push origin gh-pages
	git checkout main  # Go back to the main branch


.PHONY: build
build:
	rm -rf submodule/Recipes
	npm install
	git submodule update --init --recursive
	npm run build

dev:
	npm install
	git submodule update --init --recursive
	npm run dev
