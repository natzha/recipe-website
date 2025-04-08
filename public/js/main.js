// this file requires marked and dompurity

async function loadRecipeTree(recipesDir) {
    let recipeTree;
    try {
        const response = await fetch(recipesDir);
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }
        recipeTree = await response.json();
    } catch (error) {
        console.error('Error reading JSON file:', error);
    }

    // toc = document.getElementById("toc");

    // get the groups/type of recipe
    const groupedData = recipeTree.reduce((groups, item) => {
        if (!(item.group == "recipes")) {
            if (!groups[item.group]) {
                groups[item.group] = [];
            }
            groups[item.group].push(item);
        }
        return groups;
    }, {});

    // Create table of contents
    for (const [group, items] of Object.entries(groupedData)) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add("group");
        groupDiv.textContent = group;
        toc.appendChild(groupDiv);

        const itemList = document.createElement('ul');
        items.forEach(recipe => {
            const listItem = document.createElement('li');
            listItem.classList.add('item');
            
            const link = document.createElement('a');
            link.href = recipe.relative_path;
            link.textContent = recipe.title;
            
            listItem.appendChild(link);
            itemList.appendChild(listItem);
        });
        toc.appendChild(itemList);
    };
}

function loadHTML(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(htmlContent => {
            document.querySelector('#output').innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error loading the HTML file:', error);
        });
};

document.body.onclick = function(e){
    var tagType = e.target.tagName.toLowerCase();
    var tagsToIdentify = ['img','a'];

    for (var tags=0; tags < tagsToIdentify.length; tags++){
        if (tagType == tagsToIdentify[tags]){
            loadHTML(e.target);
            return false; // cancels the link to page
        }
    }
};

function displayToc() {
    const filesColumn = document.getElementById('files');

    if (filesColumn.style.display === 'none' || filesColumn.style.display === '') {
        filesColumn.style.display = 'block';
    } else {
        filesColumn.style.display = 'none';
    }
}

const recipesDir = 'html_files_info.json'
document.addEventListener("DOMContentLoaded", () => loadRecipeTree(recipesDir));

document.getElementById('burger-menu').addEventListener('click', () => displayToc());