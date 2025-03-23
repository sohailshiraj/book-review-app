const { bookValidation, getBooksValidation, idValidation } = require("../validations/bookValidation");

// validation for a book
const validateBook = (req, res, next) => {
    const { error } = bookValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

// Middleware for validating route params
const validateIdParam = (req, res, next) => {
    const { error } = idValidation.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Middleware for validating query params (e.g., filters)
const validateGetBooks = (req, res, next) => {
    const { error } = getBooksValidation.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateBook, validateIdParam, validateGetBooks };