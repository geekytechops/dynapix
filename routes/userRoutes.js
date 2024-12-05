const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const session = require('express-session');
const {getMallDetailsController , getSingleMallDetailsController , filterMallsController} = require('../controllers/mediaController')
const { addLobbyMediaController , editLobbyMediaController , deleteLobbyMediaController} = require('../controllers/mediaController')

router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

router.get('/', (req, res) => {
    res.render('index');
});
// router.get('/malls', getMallDetailsController);  
router.get('/mall/:id', async (req, res) => {
    const isLoggedin = req.session.user && req.session.user.isLoggedin || false;
    let pageId = req.params.id; 
        pagename='Mall';
        return await getSingleMallDetailsController(isLoggedin,pageId,pagename, res);
});
router.get('/theatre/:id', async (req, res) => {
    const isLoggedin = req.session.user && req.session.user.isLoggedin || false;
    let pageId = req.params.id; 
    pagename='Theatre';
    let page = req.params.page; 
        return await getSingleMallDetailsController(isLoggedin,pageId,pagename, res);
});
router.get('/fuel-station/:id', async (req, res) => {
    const isLoggedin = req.session.user && req.session.user.isLoggedin || false;
    let pageId = req.params.id; 
    pagename='Fuel Station';
        return await getSingleMallDetailsController(isLoggedin,pageId,pagename, res);
});


router.post('/delete-media/:id', deleteLobbyMediaController);

router.post('/add-lobby-media/:id', addLobbyMediaController);

router.post('/edit-lobby-media/:id', editLobbyMediaController);

router.post('/filter-malls', filterMallsController);

router.get('/:page', async (req, res) => {

    const isLoggedin = req.session.user && req.session.user.isLoggedin || false;
    let page = req.params.page; 
    if(page=='malls'){
        pagename='Mall';
        return await getMallDetailsController(isLoggedin,pagename, res);
    } else if(page =='theatres' ){
        pagename='Theatre';
        return await getMallDetailsController(isLoggedin,pagename, res);
    } else if( page=='fuel-stations'){
        pagename='Fuel Station'       
        return await getMallDetailsController(isLoggedin,pagename, res);
    }
 
    const filePath = path.join(__dirname,'..', 'views', `${page}.ejs`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            
            return res.status(404).send('Page not found');
        }
        
        res.render(page);
    });
});

module.exports = router;