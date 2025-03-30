// const express = require('express');
// var fs = require('fs');
// var files = fs.readdirSync('submodule/Recipes/');

// console.log("files: ", files)



// // /////////////////////////////////

// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const marked = require('marked');
// const app = express();
// const port = 3000;

// // Directory containing markdown files
// const markdownDir = path.join(__dirname, '../submodules/Recipes');

// // Serve static files (like CSS, JS) from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Render Markdown files as HTML pages
// fs.readdir(markdownDir, (err, files) => {
//   if (err) {
//     console.error('Error reading markdown directory:', err);
//     return;
//   }

//   files.forEach(file => {
//     const filePath = path.join(markdownDir, file);

//     console.log("filepath", filePath)

//     if (path.extname(file) === '.md') {
//       const pageName = path.basename(file, '.md'); // remove the extension for the page name

//       app.get(`/${pageName}`, (req, res) => {
//         fs.readFile(filePath, 'utf8', (err, data) => {
//           if (err) {
//             console.error('Error reading markdown file:', err);
//             return res.status(500).send('Internal Server Error');
//           }

//           const htmlContent = marked(data); // Convert Markdown to HTML
//           const fullHtml = `
//             <html>
//               <head><title>${pageName}</title></head>
//               <body>
//                 <h1>${pageName}</h1>
//                 ${htmlContent}
//               </body>
//             </html>
//           `;

//           res.send(fullHtml);
//         });
//       });
//     }
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
