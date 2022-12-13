const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        /// use shared folder to store images
        cb(null, path.join(__dirname, '../public'));
    },

    filename: (req, file, cb) => {
        // change orginal name to a unique name
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});


const upload = multer({
    storage
})


module.exports = upload;