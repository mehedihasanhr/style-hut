import Review from '../models/ReviewModel';
import User from '../models/UserModel';
import Product from '../models/ProductModel';

class ReviewsController {

    // * user error messages
    static userErrorMessages = {
        status: 'error',
        message: 'You must be logged in to create a review'
    }

    // * product error messages
    static productErrorMessages = {
        status: 'error',
        message: 'Product id is required'
    }

    // * Create a review
    async createReview(req, res) {
        try {
            //* get user id
            const userId = req.session.user.data.id;

            // ! if user is not logged in, return error
            if(!userId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'You must be logged in to create a review'
                });
            }

            //* get product id 
            const productId = req.params.id;

            if(!productId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Product id is required'
                });
            }

            //* save review to database 
            const review = await Review.create({
                product: productId,
                user: userId,
                type: "review",
                ...req.body
            });

            //* update product reviews array
            await Product.findByIdAndUpdate(productId, {
                $push: { reviews: review._id }
            })

            //* update user reviews array
            await User.findByIdAndUpdate(userId, {
                $push: { reviews: review._id }
            })

            //* return review
            return res.status(201).json({
                status: 'success',
                message: 'Review created successfully',
                data: review
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'error',
                message: 'Something went wrong'
            });
        }
        
    }

    /* 
        * edit a review
        * @params: reviewId
    */

    async updateReview(req, res) {
        const { reviewId } = req.params;

        // ! if review id is not provided, return error
        if(!reviewId) return res.status(400).json({
            status: 'error',
            message: 'Review id is required'
        });

        try {
            // * find review and update
            await Review.findByIdAndUpdate(reviewId, req.body).then(review => {
                // * return updated review
                return res.status(200).json({
                    status: 'success',
                    message: 'Review updated successfully',
                    data: review
                });
            }).catch(err => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            });

        }catch(err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Something went wrong'
            });
        }
    }

    /*
        * delete a review 
        * @params: reviewId
        * @return: deleted review
    */
    async deleteReview(req, res) {
        const { reviewId } = req.params;
        if(!reviewId) return res.status(400).json({
            status: 'error',
            message: 'Review id is required'
        });

        try{
            // * find and delete review
            await Review.findByIdAndDelete(reviewId).then(review => {   
                // * delete review from product reviews array
                Product.findByIdAndUpdate(review.product, {
                    $pull: { reviews: review._id }
                });

                // * delete review from user reviews array
                User.findByIdAndUpdate(review.user, {
                    $pull: { reviews: review._id }
                });

                // * return deleted review
                return res.status(200).json({
                    status: 'success',
                    message: 'Review deleted successfully',
                    data: review
                });
            }).catch(err => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }

    /* Reply control */
    // * create a reply to a review 
    async createReply(req, res) {
        
        try{
            // * get user
            const userId = req.session.user.data.id;

            // ! if user is not logged in, return error
            if(!userId) return res.status(400).json(this.userErrorMessages);

            // * get product id
            const reviewId = req.params.reviewId;

            // ! if product id is not provided, return error
            if(!reviewId) return res.status(400).json(this.productErrorMessages);

            // * also check if review exists
            let review = await Review.findById(reviewId);

            // ! if review does not exist, return error
            if(!review) return res.status(404).json({
                status: 'error',
                message: 'Review not found'
            });

            // push reply to review

            review.replies.push({
                user: userId,
                reply: req.body.reply
            });

            await review.save().then(review => {
                return res.status(201).json({
                    status: 'success',
                    message: 'Reply created successfully',
                    data: review
                });
            }) .catch(err => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            });

           
        }catch(err){
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }
    

    // * delete a reply 
    async deleteReply(req, res) {
        /*
        * * @params: reviewId, replyId
        */

        const { reviewId, replyId } = req.params;

        if(!reviewId || !replyId) return res.status(400).json({
            status: 'error',
            message: 'Review id and reply id are required'
        });

        try{
            // * get review from database 
            let review = await Review.findById(reviewId);

            // * check if review exists
            // ! if review does not exist, return error
            if(!review) return res.status(404).json({
                status: 'error',
                message: 'Review not found'
            });

            // * filter out reply to be deleted
            review.replies = review.replies.filter(reply => reply._id != replyId);

            // * save review
            await review.save().then(review => {
                return res.status(200).json({
                    status: 'success',
                    message: 'Reply deleted successfully',
                    data: review
                });
            }).catch(err => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }

}



export default new ReviewsController ();