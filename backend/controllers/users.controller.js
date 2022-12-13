const { User } = require('../models/user.model');
const { userErrorResponse } = require('../utils/userErrorResponse');




class UserController {
    async index(req, res) {
        try{
            const users = await User.find().select(["-password","-__v"]).exec();

            if(!users) return res.status(400).json({message: 'Bad request', error: true});

            return res.status(200).json({
                message: 'Users fetched successfully',
                data: users,
                error: false
            });

        } catch(err){
            console.log(err);
            return res.status(500).json({message: 'Internal server error', error: true});
        }
    }
    
    // upload a user image
    async upload(req, res) {
        const file = req.file;
        const id = req.params.id;

        if(!file) return res.status(400).json({message: 'Bad request', error: true});

        try{
            const user = await User.findByIdAndUpdate(id, {avatar: file.filename}, {new: true});

            if(!user) return res.status(400).json({message: 'Bad request', error: true});

            return res.status(200).json({
                message: 'User image uploaded successfully',
                avatar: user.avatar,
                error: false
            });

        }catch(err){ 
            console.log(err.code);
            return res.status(500).json({message: 'Internal server error', error: true});
        }
    }

    // get a user by id
    async show(req, res) {
        const id = req.params.id;

        try{
            const user = await User.findById(id).select(["-password","-__v"]).exec();


            if(!user) return res.status(400).json({message: 'Bad request', error: true});

            return res.status(200).json({
                message: 'User fetched successfully',
                data: user,
                error: false
            });

        } catch(err){
            console.log(err);
            return res.status(500).json({message: 'Internal server error', error: true});
        }


    }

    // update a user by id
    async update(req, res) {
        const id = req.params.id;
        const data = req.body;

        if(!data) return res.status(400).json({message: 'Bad request', error: true});

        try{
            const user = await User.findById(id).select(["-password","-__v"]).exec();

            if(!user) return res.status(400).json({message: 'User not found', error: true});

            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,                
            }).select(["-password","-__v"]).exec();


            if(!updatedUser) {
                return res.status(400).json({
                    message: "User update failed",
                    error: true
                })
            }

            return res.status(201).json({
                message: "user updated successfully",
                data: updatedUser,
                error: false
            })

        }catch(err){
            
            let {message} = userErrorResponse(err);
            return res.status(400).json({message, error: true});
        }
    }
    

    // delete a user by id
    async delete(req, res) {
        const id = req.params.id;

        try{
           const user = await User.findByIdAndRemove(id).exec();

              if(!user) return res.status(400).json({message: 'User not found', error: true});

            return res.status(200).json({
                message: 'User deleted successfully',
                error: false
            })
        }catch(err) {
            const { message } = userErrorResponse(err);
            return res.status(400).json({message, error: true});
        }
    }


}


module.exports = { UserController }