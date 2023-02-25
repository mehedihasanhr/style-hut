import _ from 'lodash';

export const valProductReqBody = (req, res, next) => {
    const data = req.body;
    const {
        title,
        price,
        stock,
        categories,
        images,
        tags,
    } = data;

    if (
        !title ||
        !price ||
        !stock ||
        _.isEmpty(categories) ||
        images.length === 0 ||
        tags.length === 0
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request body',
        });
    }

    next();
}