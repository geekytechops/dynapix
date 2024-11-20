const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const {addMediaController , updateMediaController} = require('../controllers/mediaController')

const {getSingleMallEditDetailsController} = require('../controllers/mediaController')

router.get('/admin', (req, res) => {
    res.render('admin/index');
});


router.get('/admin/edit-media/:id', async (req, res) => {
    let pageId = req.params.id; 
    return await getSingleMallEditDetailsController(pageId, res);
})

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

router.post('/add-media', addMediaController);
router.post('/update-media', updateMediaController);

module.exports = router;