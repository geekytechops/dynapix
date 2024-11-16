const fs = require('fs');
const path = require('path');

const sourceDir = '../dynopix_bkp'; // Folder containing .html files
const targetDir = './ejs-files'; // Folder to store .ejs files

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

// Read all files in the source directory
fs.readdir(sourceDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(sourceDir, file);
            const newFilePath = path.join(targetDir, file.replace('.html', '.ejs'));

            // Read the file content
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) throw err;

                // Modify content (if necessary)
                const updatedContent = data.replace(/<!-- Replaceable -->/g, '<%= dynamicContent %>');

                // Write to the new .ejs file
                fs.writeFile(newFilePath, updatedContent, (err) => {
                    if (err) throw err;
                    console.log(`Converted: ${file} to ${newFilePath}`);
                });
            });
        }
    });
});
