const express = require("express");
const bookController = require("../controllers/bookController");
const { validateBook, validateGetBooks, validateIdParam } = require("../middleware/validate");

const router = express.Router();

router.get("/", validateGetBooks, bookController.getBooks);
router.get("/:id", validateIdParam, bookController.getBookById);
router.post("/", validateBook, bookController.addBook);
router.put("/:id", validateIdParam, validateBook, bookController.updateBook);
router.delete("/:id", validateIdParam, bookController.deleteBook);

module.exports = router;