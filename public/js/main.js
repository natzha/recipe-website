// this file requires marked and dompurity

async function loadRecipeTree(recipesDir) {

    let recipeTree;

    try {
        const response = await fetch(recipesDir);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        recipeTree = data;

    } catch (error) {
        console.error('Error reading JSON file:', error);
    }

    toc = document.getElementById("toc");

    // Create table of contents
    const groupedData = recipeTree.reduce((groups, item) => {
        if (!(item.group == "recipes")) {
            if (!groups[item.group]) {
                groups[item.group] = [];
            }
            groups[item.group].push(item);
        }
        return groups;
    }, {});


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
        .then(response => response.text()) // Read the HTML file content as text
        .then(htmlContent => {
            document.querySelector('#output').innerHTML = htmlContent; // Insert content into the element
        })
        .catch(error => {
            console.error('Error loading the HTML file:', error);
        });
};


function clickOrigin(e){
    var target = e.target;
    var tag = [];
    tag.tagType = target.tagName.toLowerCase();
    tag.tagClass = target.className.split(' ');
    tag.id = target.id;
    tag.parent = target.parentNode;

    return tag;
}


document.body.onclick = function(e){
    var elem = clickOrigin(e);

    var tagsToIdentify = ['img','a'];

    for (var tags=0; tags < tagsToIdentify.length; tags++){
        if (elem.tagType == tagsToIdentify[tags]){
            loadHTML(e.target);
            return false; // or do something else.
        }
    }
};

const recipesDir = 'recipes/html_files_info.json'
document.addEventListener("DOMContentLoaded", () => loadRecipeTree(recipesDir));
// document.addEventListener("DOMContentLoaded", () => loadHTML(filePath));