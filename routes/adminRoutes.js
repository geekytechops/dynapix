const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const {addMediaController , updateMediaController , addCampaignController} = require('../controllers/mediaController')
const { redirectHtmlMiddleware, isAuthenticated } = require('../middlewares/routerMiddleware');
const {getSingleMallEditDetailsController , deleteSingleMallController} = require('../controllers/mediaController')

router.get('/admin', (req, res) => {
    res.render('admin/index');
});

router.post('/admin/logout', (req, res) => {
    if(req.session.user){
        req.session.user.isLoggedin = '';
    }    
    return res.status(200).send('success');
});

router.get('/admin/edit-media/:id' , isAuthenticated , async (req, res) => {
    let pageId = req.params.id; 
    return await getSingleMallEditDetailsController(pageId, res);
})

router.post('/admin/delete-media', async (req, res) => {
    const mallId = req.body.id; // Fetch the ID from the request body
    if (!mallId) {
        return res.status(400).send('Mall ID is required');
    }

    await deleteSingleMallController(mallId, res);
});

router.get('/admin/:page',isAuthenticated, (req, res) => {
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
router.post('/add-campaign', addCampaignController);
router.post('/update-media', updateMediaController);

module.exports = router;