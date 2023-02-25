import  multer from  'multer' ;
import path from  'path' ;
import crypto from  'crypto' ;
import fs from  'fs' ;

const __dirname = path.resolve();


// * storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // * allow extension of file 
        const filetypes = /jpeg|jpg|png|gif/;
        
        // * check extension
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // * check mime
        const mimetype = filetypes.test(file.mimetype);

        if(mimetype && extname){
            // * check if public folder exists
            if(!fs.existsSync(path.join(__dirname, 'public'))){
                fs.mkdirSync(path.join(__dirname, 'public'));
            }

            // * check if uploads folder exists
            if(!fs.existsSync(path.join(__dirname, 'public/uploads'))){
                fs.mkdirSync(path.join(__dirname, 'public/uploads'));
            }

            // * save file
            cb(null, path.join(__dirname, 'public/uploads'));
        
        }else{
            return cb(new Error('Only images are allowed'));
        }
    },
    // * rename file
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if(err) return cb(err);
            const ext = path.extname(file.originalname);
            const hash = buf.toString( 'hex' );
            const filename = `${hash}${ext}`;
            cb(null, filename);
        });
    }
})


// * init upload
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 5MB
    },
})

export default upload;