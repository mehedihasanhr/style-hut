const { Comment }  = require('../models/comment.model');


class CommentController {

    async index (req, res) {
        const comments = await Comment.find({});
        
        if(!comments) {
            return res.status(404).json({message: 'No comments found', error: false, });
        }


        return res.status(200).json({
            message: 'Comments found',
            error: false,
            comments
        })
    }

    // create a new comment
    async create (req, res) {
        const {user, product, comment, rating} = req.body;

        const newComment = await Comment.create({
            user,
            product,
            comment,
            rating
        });

        if(!newComment) {
            return res.status(500).json({message: 'Error creating comment', error: true, });
        }

        return res.status(201).json({
            message: 'Comment created',
            error: false,
            newComment
        })
    }

    // delete a comment
    async delete (req, res) {
        const {id} = req.params;

        const comment = await Comment.findByIdAndDelete(id);

        if(!comment) {
            return res.status(404).json({message: 'Comment not found', error: true, });
        }

        return res.status(200).json({
            message: 'Comment deleted',
            error: false,
            comment
        })
    }
}


module.exports = {
    CommentController
}