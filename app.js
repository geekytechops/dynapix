const express = require('express');
const app = express(); 
const http = require('http');
const routerMiddleware = require('./middlewares/routerMiddleware')
const server = http.createServer(app);
const apiRouter = require('./routes/api'); 
const path = require('path')
app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routerMiddleware);

app.use('/',apiRouter);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
