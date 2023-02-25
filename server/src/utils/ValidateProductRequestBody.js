import _ from 'lodash';

export const validateProductRequestBody = (data) => {
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
    ) return false;

    return true;
}