const express = require('express');
const app = express();
const http = require('http');
const fileUpload = require('express-fileupload');
const routerMiddleware = require('./middlewares/routerMiddleware');
const server = http.createServer(app);
const apiRouter = require('./routes/index');
const path = require('path');
const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(routerMiddleware);


app.use('/', apiRouter);

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).render('500', { error: err }); 
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
