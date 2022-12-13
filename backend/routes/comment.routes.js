const router = require('express').Router();

const { CommentController } = require('../controllers/comment.controller');


const commentController = new CommentController();

router.get('/', commentController.index);
router.post('/', commentController.create);
router.delete('/:id', commentController.delete);

module.exports = router;