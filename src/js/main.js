// this file requires marked and dompurity
// import extConvertMarkdown2Html from "internal_convert.js"

// let html = extConvertMarkdown2Html('../submodules/Recipes/template.md')

import {marked} from 'marked'
import DOMPurify from 'dompurify'

function cleanFileStructure(markdownFiles) {
    const fileStructure = {}
    
    for (const path in markdownFiles) {
        const cleanPath = path.replace("../../submodules/Recipes/", "");
        const parts = cleanPath.split("/");
        const folder = parts.length > 1 ? parts[0] : "root";
        const filename = parts[parts.length - 1].replace(".md", "");

        if (folder == "root") {
            continue;
        }

        if (!fileStructure[folder]) {
            fileStructure[folder] = [];
        }

        fileStructure[folder].push({ path, filename })
    }

    return fileStructure;
}

function generateSidebar(markdownFiles, fileStructure) {
    const toc = document.getElementById("toc");
    const mdDisplay = document.getElementById("output");

    // Create table of contents
    for (const [group, items] of Object.entries(fileStructure)) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add("group");
        groupDiv.textContent = group;
        toc.appendChild(groupDiv);

        const itemList = document.createElement('ul');
        items.forEach(recipe => {
            const listItem = document.createElement('li');
            listItem.classList.add('item');           
            listItem.textContent = recipe.filename;

            // display recipe
            listItem.onclick = async () => {
                const fileContent = await markdownFiles[recipe.path]()
                let html = marked.parse(fileContent);
                mdDisplay.innerHTML  = DOMPurify.sanitize(html);

                if (document.documentElement.clientWidth < 768) {
                    displayToc();
                }
            }

            itemList.appendChild(listItem);
        });
        toc.appendChild(itemList);
    };
}

function displayToc() {
    const filesColumn = document.getElementById('files');

    if (filesColumn.style.display === 'none' || filesColumn.style.display === '') {
        filesColumn.style.display = 'block';
    } else {
        filesColumn.style.display = 'none';
    }
}

const markdownFiles = import.meta.glob('../../submodules/Recipes/**/*.md', { as: 'raw' })
const fileStructure = cleanFileStructure(markdownFiles);
generateSidebar(markdownFiles, fileStructure);

// set to only run when small screen
if (document.documentElement.clientWidth < 768) {
    function displayToc() {
        const filesColumn = document.getElementById('files');
    
        if (filesColumn.style.display === 'none' || filesColumn.style.display === '') {
            filesColumn.style.display = 'block';
        } else {
            filesColumn.style.display = 'none';
        }
    }

    function displayTocOutput() {
        const filesColumn = document.getElementById('files');

        if (!(filesColumn.style.display === 'none') || !(filesColumn.style.display === '')) {
            filesColumn.style.display = 'none';
        }
    }

    document.getElementById('burger-menu').addEventListener('click', () => displayToc());
    document.getElementById('output').addEventListener('click', () => displayTocOutput());
}