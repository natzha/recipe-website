const fs = require("fs");
const path = require("path");
const marked = require("marked");
const { JSDOM } = require('jsdom');
const DOMPurify = require('dompurify');

// set up DOMPurify with JSDOM
const window = (new JSDOM('')).window;
const dompurify = DOMPurify(window);

const getMarkdownFiles = (inputDir, outputDir) => {
    // check output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // place to store results
    let filesArray = []
    var files = fs.readdirSync(inputDir);
    let htmlFilesInfo = [];

    // step through each file in files, we want to keep the 
    files.forEach(file => {

        const filePath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);
        const fileInfo = fs.statSync(filePath);

        if (fileInfo && fileInfo.isDirectory()) {
            // create a directory in output
            const formattedOutputPath = outputPath.replace(/\s/g, '_');
            if (!fs.existsSync(formattedOutputPath)) {
                fs.mkdirSync(formattedOutputPath, {recursive: true});
            }

            // recurse directory and record outputs
            let filesArrayRet, htmlFilesInfoRet = getMarkdownFiles(filePath, outputPath);
            filesArray = filesArray.concat(filesArrayRet);
            htmlFilesInfo = htmlFilesInfo.concat(htmlFilesInfoRet);

        } else if (filePath.endsWith(".md")) {
            const outputFilepath = path.join(outputDir, path.basename(filePath, ".md") + ".html");
            filesArray.push(filePath);

            formattedOutputFilePath = outputFilepath.replace(/\s/g, '_');
            let relative_path;
            if (formattedOutputFilePath.startsWith("public")) {
                relative_path = formattedOutputFilePath.replace("public", "");
            } 

            htmlFilesInfo.push({
                title: path.basename(outputFilepath, ".html"),
                group: path.basename(outputDir),
                page: path.basename(formattedOutputFilePath),
                directory: path.dirname(formattedOutputFilePath),
                path: formattedOutputFilePath,
                relative_path: relative_path
            });

            let html = convertMarkdown2Html(filePath);
            fs.writeFileSync(formattedOutputFilePath, html, "utf-8");
        }
    });
    
    return filesArray, htmlFilesInfo;
}



const convertMarkdown2Html = (filepath) => {
    const markdown = fs.readFileSync(filepath, "utf-8");

    let options = {
        headerIds: false,
        mangle: false
    };
    let html = marked.parse(markdown, options);
    let sanitized = dompurify.sanitize(html);

    console.log(`HTML file converted: ${filepath}`);

    return sanitized;
}

const convert = () => {
    const inputDir = "submodules/Recipes";
    const outputDir = "public/recipes/";
    let files, htmlFilePaths = getMarkdownFiles(inputDir, outputDir)

    // save data into json
    const jsonOutputPath = path.join(outputDir, 'html_files_info.json');
    fs.writeFileSync(jsonOutputPath, JSON.stringify(htmlFilePaths, null, 4));
}

convert();