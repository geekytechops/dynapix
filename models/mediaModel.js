const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const MediaModel = {
    getMallDetails: (page) => {
        console.log(page)
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_data WHERE md_location_type = ?"; 
            db.query(query,[page], (err, results) => {
                if (err) {
                    return reject(err); 
                }
                resolve(results); 
            });
        });
    },
    getSingleMallDetail: (mallId,page) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_data WHERE md_location_type = ? AND md_id = ?";
            
            db.query(query, [page,mallId], (err, results) => {
                if (err) {
                    return reject(err); 
                }
                resolve(results.length > 0 ? results[0] : null);
            });
        });
    },

    getMallAdLocations: (mallId) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_ad_location WHERE md_id = ?";
            
            db.query(query, [mallId], (err, results) => {
                if (err) {
                    return reject(err); 
                }
                resolve(results); 
            });
        });
    },

    getFilteredMalls : (location) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_data WHERE md_location = ?";
            
            db.query(query, [location], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    getSingleMallEditDetail: (mallId) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_data WHERE md_id = ?";
            
            db.query(query, [mallId], (err, results) => {
                if (err) {
                    return reject(err); 
                }
                resolve(results.length > 0 ? results[0] : null);
            });
        });
    },

    deleteSingleMall: (mallId) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM dypx_media_data WHERE md_id = ?";
            db.query(query, [mallId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows > 0); // Returns true if a row was deleted
            });
        });
    },
    

    updateMedia: (mediaId, mediaData) => {
        console.log(mediaData.md_type)
        console.log(mediaId)
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE dypx_media_data
                SET 
                    md_type = ?, 
                    md_name = ?, 
                    md_description = ?, 
                    md_location = ?, 
                    md_footfalls = ?, 
                    md_duration = ?, 
                    md_image = ?
                WHERE md_id = ?
            `;
            const params = [
                mediaData.mediaType,      
                mediaData.mediaTitle, 
                mediaData.mediaDescription,
                mediaData.mediaLocation,   
                mediaData.mediaFootfalls,
                mediaData.mediaDuration,  
                mediaData.mediaImage,      
                mediaId,                  
            ];
            db.query(query, params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    
    addMedia: (mediaData, mediaImage) => {
        return new Promise((resolve, reject) => {
            const {
                mediaType,
                mediaTitle,
                mediaDescription,
                mediaFootfalls,
                mediaDuration,
                mediaScreens,
                mediaSlots,
                mediaLocationType,
                mediaLocation,
                mediaSize,
                mediaLoopTime,
            } = mediaData;

            
            const status = 0;
            let imagePath = null;

            
            if (mediaImage) {
                const uploadDir = path.join(__dirname, '../uploads/');

                
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                
                
                const timestamp = Date.now();
                const originalName = mediaImage.name.replace(/\s+/g, '_'); 
                const uniqueName = `${timestamp}_${originalName}`;
                
                
                const targetFile = path.join(uploadDir, uniqueName);
                const relativeImagePath = `uploads/${uniqueName}`;
                
                const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                const fileExtension = path.extname(mediaImage.name).toLowerCase();
                
                
                if (!validExtensions.includes(fileExtension.substring(1))) {
                    return reject(new Error('Only JPG, JPEG, PNG, and GIF files are allowed.'));
                }
                
                
                mediaImage.mv(targetFile, (err) => {
                    if (err) return reject(new Error('Error uploading the file.'));
                });
                
                
                imagePath = relativeImagePath;
            }

            
            const query = `
                INSERT INTO dypx_media_data 
                (md_name, md_location_type, md_location, md_image, md_description, md_footfalls, md_duration, 
                 md_num_slots, md_num_screens, md_size, 
                 md_looptime, md_status) 
                VALUES (?, ?, ?, ?, ? ,?, ?,?, ?, ?,  ?, ?)
            `;

            const values = [
                mediaTitle,
                mediaType,
                mediaLocation,
                imagePath,
                mediaDescription,
                mediaFootfalls,
                mediaDuration,
                mediaSlots,
                mediaScreens,
                // mediaType,
                mediaSize,
                mediaLoopTime,
                status,
            ];

            db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    addLobbyMedia: (mdId, mediaData, mediaImage) => {
        return new Promise((resolve, reject) => {
            const {
                mediaName,    
                mediaType,    
                mediaSize, 
                mediaScreens, 
                mediaSlots,    
                mediaDuration,
                mediaLoopTime,
                mediaFootfalls 
            } = mediaData;
    
            let imagePath = null;
    
         
            if (mediaImage) {
                const uploadDir = path.join(__dirname, '../uploads/');
    
            
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
    
             
                const timestamp = Date.now();
                const originalName = mediaImage.name.replace(/\s+/g, '_');
                const uniqueName = `${timestamp}_${originalName}`;
                const targetFile = path.join(uploadDir, uniqueName);
    
       
                const fileStream = fs.createWriteStream(targetFile);
                fileStream.on('error', (err) => {
                    return reject(new Error('Error uploading the file.'));
                });
    
          
                fileStream.write(mediaImage.data, () => {
                    fileStream.end();
                });
    
                imagePath = `uploads/${uniqueName}`;
            }
    

            const query = `
                INSERT INTO dypx_media_ad_location 
                (md_id, md_ad_name, md_ad_size, md_ad_num_screen, md_ad_num_slots, 
                 md_ad_num_duration, md_ad_footfalls, md_ad_looptime, md_ad_status, md_ad_image, 
                 md_ad_created_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            `;
    
            const values = [
                mdId,
                mediaName,
                mediaSize,
                mediaScreens,
                mediaSlots,
                mediaDuration,
                mediaFootfalls,
                mediaLoopTime,
                0, 
                imagePath,
            ];
    
            db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
deleteLobbyMedia: (mdId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM dypx_media_ad_location WHERE md_ad_id = ?`;
        db.query(query, [mdId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

};



module.exports = MediaModel;
