import PhotoModel from "../models/PhotoModel";

class UploadController {

// Upload file to server
    upload = async (req, res) => {
        console.log(req.file);
        try{
            // * check if file is uploaded
            if(!req.file){
                return res.status(400).json({
                    status: 'error',
                    message: 'No file uploaded',
                });
            }

            return res.status(201).json({
                status: 'success',
                message: 'Photo uploaded successfully',
                data: req.file,
            });
            
            // * create new photo
            try {
                const photo = new PhotoModel({
                    originalname: req.file.originalname,
                    filename: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    path: req.file.path,
                    user: req.user._id,
                });
                
                // * save photo
                try{
                    const savedPhoto = await photo.save();
                    return res.status(201).json({
                        status: 'success',
                        message: 'Photo uploaded successfully',
                        data: savedPhoto,
                    });
                }catch(err){
                    console.log(err);
                    return res.status(500).json({
                        status: 'error',
                        message: 'Internal server error',
                    });
                }


            }catch(err){
                console.log(err);
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    };


}



export default new UploadController();