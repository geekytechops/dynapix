const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const authController = require('../controllers/authController')

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/admin', (req, res) => {
    res.render('admin/index');
});

router.get('/admin/:page', (req, res) => {
    const page = req.params.page; 
 
    const filePath = path.join(__dirname,'..', 'views','admin', `${page}.ejs`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            
            return res.status(404).send('Page not found');
        }
        
        res.render(path.join('admin', page));
    });
});

router.get('/:page', (req, res) => {
    const page = req.params.page; 
 
    const filePath = path.join(__dirname,'..', 'views', `${page}.ejs`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            
            return res.status(404).send('Page not found');
        }
        
        res.render(page);
    });
});



router.post('/login',authController.login);

module.exports = router;