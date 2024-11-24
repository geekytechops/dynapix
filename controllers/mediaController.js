const MediaModel = require('../models/mediaModel');
const path = require('path')
const fs = require('fs');

const updateMediaController = async (req, res) => {
    const mediaId = req.body.mediaId;
    const mediaData = req.body;
    const mediaImage = req.files ? req.files.mediaImage : null; 

    if (!mediaImage) {
        mediaData.mediaImage = req.body.existingImage;
    }

    try {
        
        if (mediaImage) {
            const existingImagePath = path.join(__dirname, '..', 'uploads', req.body.existingImage);
            
            if (fs.existsSync(existingImagePath)) {
                fs.unlink(existingImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err.message);
                });
            }
            
            mediaData.mediaImage = 'uploads/'+mediaImage.name;
            const uploadPath = path.join(__dirname, '..', 'uploads', mediaImage.name);
            await mediaImage.mv(uploadPath);
        }

        const result = await MediaModel.updateMedia(mediaId, mediaData);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Media updated successfully' });
        } else {
            res.status(404).json({ message: 'Media not found' });
        }
    } catch (error) {
        console.error('Error updating media:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const filterMallsController = async (req, res) => {
    const { location } = req.body;

    if (!location) {
        return res.status(400).json({ message: 'Location is required' });
    }

    try {
        const malls = await MediaModel.getFilteredMalls(location);
        if (malls.length > 0) {
            res.status(200).json({ malls });
        } else {
            res.status(404).json({ message: 'No malls found for this location.' });
        }
    } catch (error) {
        console.error('Error filtering malls:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSingleMallDetailsController = async (isLoggedin, pageId, page, res) => {
    const mallId = pageId;

    try {
        
        const mallDetails = await MediaModel.getSingleMallDetail(mallId, page);

        if (!mallDetails) {
            return res.status(404).send('Mall not found');
        }

        
        const mallAdLocations = await MediaModel.getMallAdLocations(mallId);

        
        res.render('mallDetails', { 
            mall: mallDetails, 
            locations: mallAdLocations, 
            isLoggedin: isLoggedin 
        });
    } catch (error) {
        console.error('Error fetching mall details or ad locations:', error.message);
        res.status(500).send('Internal Server Error');
    }
};


const getSingleMallEditDetailsController = async (pageId, res) => {
    const mallId = pageId;

    try {
        const mallDetails = await MediaModel.getSingleMallEditDetail(mallId);

        if (!mallDetails) {
            return res.status(404).send('Mall not found');
        }

        res.render('admin/edit-media', { mall: mallDetails });
    } catch (error) {
        console.error('Error fetching mall details:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const addLobbyMediaController = async (req, res) => {
    const mdId = req.params.id; 
    const mediaData = req.body;
    const mediaImage = req.files ? req.files.mediaImage : null;
  
    try {
      const result = await MediaModel.addLobbyMedia(mdId, mediaData, mediaImage);
      res.status(200).json({ message: 'Lobby media added successfully.', result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const addMediaController = async (req, res) => {

    const mediaData = req.body;
    const mediaImage = req.files ? req.files.mediaImage : null;

    try {
        const result = await MediaModel.addMedia(mediaData, mediaImage);
        res.status(200).json({ message: 'Media data inserted successfully.', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMallDetailsController = async (isLoggedin,page, res) => {
       try {
        const mallDetails = await MediaModel.getMallDetails(page); 
        pagename = page.toLowerCase()+'s';
        if(pagename=='fuel stations'){
            pagename='fuel-stations';
        }
        console.log(isLoggedin);
        res.render(pagename, {
            title: 'Malls | Media | Dynapix',
            mallData: mallDetails, 
            isLoggedin:isLoggedin
        });
    } catch (error) {
        console.log(error)
        res.status(500).render('error', {
            message: 'An error occurred while retrieving mall details.',
            error: error.message,
        });
    }
};

module.exports = { addMediaController , filterMallsController , addLobbyMediaController , updateMediaController,  getMallDetailsController ,getSingleMallDetailsController , getSingleMallEditDetailsController };