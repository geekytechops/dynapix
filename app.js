const express = require('express');
const app = express();
const http = require('http');
const fileUpload = require('express-fileupload');
const routerMiddleware = require('./middlewares/routerMiddleware');
const server = http.createServer(app);
const apiRouter = require('./routes/index');
const path = require('path');
const session = require('express-session');

// Set up session middleware **before** routes
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

// View engine and static file setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routerMiddleware);

// Define routes
app.use('/', apiRouter);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
