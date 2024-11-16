const express = require('express');
const app = express(); 
const http = require('http');
const fs = require('fs');
const path = require('path')
app.set('view engine', 'ejs');
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        // Redirect to the path without `.html`
        const newPath = req.path.replace(/\.html$/, '');
        return res.redirect(301, newPath); // 301 permanent redirect
    }
    next();
});

app.get('/:page', (req, res) => {
    const page = req.params.page; // Get the page name from the URL

    // Check if the file exists in the 'views' folder
    const filePath = path.join(__dirname, 'views', `${page}.ejs`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file doesn't exist, send a 404 response
            return res.status(404).send('Page not found');
        }
        // Render the requested page
        res.render(page);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
