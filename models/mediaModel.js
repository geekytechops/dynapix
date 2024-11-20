const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const MediaModel = {
    getMallDetails: (page) => {
        console.log(page)
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_data WHERE md_location_type = ?"; // Adjust condition if needed
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
            
            // Use parameterized query to prevent SQL injection
            db.query(query, [page,mallId], (err, results) => {
                if (err) {
                    return reject(err); // Reject the promise with the error
                }
                resolve(results.length > 0 ? results[0] : null); // Resolve with the first record or null if not found
            });
        });
    },

    getMallAdLocations: (mallId) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dypx_media_ad_location WHERE md_id = ?";
            
            // Use parameterized query to prevent SQL injection
            db.query(query, [mallId], (err, results) => {
                if (err) {
                    return reject(err); // Reject the promise with the error
                }
                resolve(results); // Resolve with all associated locations
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
            
            // Use parameterized query to prevent SQL injection
            db.query(query, [mallId], (err, results) => {
                if (err) {
                    return reject(err); // Reject the promise with the error
                }
                resolve(results.length > 0 ? results[0] : null); // Resolve with the first record or null if not found
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
                mediaData.mediaType,       // 'Mall' or other type
                mediaData.mediaTitle,      // 'test'
                mediaData.mediaDescription, // 'tes'
                mediaData.mediaLocation,    // 'tes'
                mediaData.mediaFootfalls,   // '20'
                mediaData.mediaDuration,    // '20'
                mediaData.mediaImage,       // 'uploads/1731985268577_images_(5).jpg'
                mediaId,                    // '6'
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

            // Default status
            const status = 0;
            let imagePath = null;

            // Handle file upload if provided
            if (mediaImage) {
                const uploadDir = path.join(__dirname, '../uploads/');

                // Ensure the directory exists
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                
                // Generate a unique filename with underscores instead of spaces
                const timestamp = Date.now();
                const originalName = mediaImage.name.replace(/\s+/g, '_'); // Replace spaces with underscores
                const uniqueName = `${timestamp}_${originalName}`;
                
                // Define the path for the uploaded file within the uploads folder
                const targetFile = path.join(uploadDir, uniqueName);
                const relativeImagePath = `uploads/${uniqueName}`; // Relative path for storing in the database
                
                const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                const fileExtension = path.extname(mediaImage.name).toLowerCase();
                
                // Validate file type
                if (!validExtensions.includes(fileExtension.substring(1))) {
                    return reject(new Error('Only JPG, JPEG, PNG, and GIF files are allowed.'));
                }
                
                // Move the file to the uploads folder
                mediaImage.mv(targetFile, (err) => {
                    if (err) return reject(new Error('Error uploading the file.'));
                });
                
                // Use the relative path for storing in the database
                imagePath = relativeImagePath;
            }

            // SQL query for inserting data
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
                mediaName,     // Matches `mediaName` from the request
                mediaType,     // Matches `mediaType` from the request
                mediaSize,     // Matches `mediaSize` from the request
                mediaScreens,  // Matches `mediaScreens` from the request
                mediaSlots,    // Matches `mediaSlots` from the request
                mediaDuration, // Matches `mediaDuration` from the request
                mediaLoopTime, // Matches `mediaLoopTime` from the request
                mediaFootfalls // Matches `mediaFootfalls` from the request
            } = mediaData;
    
            let imagePath = null;
    
            // Handle image upload
            if (mediaImage) {
                const uploadDir = path.join(__dirname, '../uploads/');
    
                // Ensure the directory exists
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
    
                // Generate a unique filename with underscores instead of spaces
                const timestamp = Date.now();
                const originalName = mediaImage.name.replace(/\s+/g, '_'); // Replace spaces with underscores
                const uniqueName = `${timestamp}_${originalName}`;
                const targetFile = path.join(uploadDir, uniqueName);
    
                // Write the file directly to the target location
                const fileStream = fs.createWriteStream(targetFile);
                fileStream.on('error', (err) => {
                    return reject(new Error('Error uploading the file.'));
                });
    
                // Read the uploaded file from `mediaImage.data` (binary data from form submission) and write it to the disk
                fileStream.write(mediaImage.data, () => {
                    fileStream.end();
                });
    
                // Store the relative path for database entry
                imagePath = `uploads/${uniqueName}`;
            }
    
            // SQL query for inserting data
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
                0, // Default status
                imagePath,
            ];
    
            db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
};

module.exports = MediaModel;
