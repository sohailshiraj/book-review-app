const Joi = require("joi");

// validation for book schema
const bookValidation = (book) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        summary: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        reviews: Joi.array().items(
            Joi.object({
                reviewer: Joi.string().allow("").optional(),
                text: Joi.string().required(),
            })
        ),
    });

    return schema.validate(book);
};

// Schema for get book by id
const idValidation = Joi.object({
    id: Joi.string().alphanum().required(),
});

// Schema for get books
const getBooksValidation = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    minRating: Joi.number().min(1).max(5),
    maxRating: Joi.number().min(1).max(5),
    sortBy: Joi.string(),
    page: Joi.number(),
    pageSize: Joi.number()
});

module.exports = { bookValidation, idValidation, getBooksValidation };