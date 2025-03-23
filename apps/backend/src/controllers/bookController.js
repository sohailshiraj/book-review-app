const bookService = require('../services/bookService');

const getBooks = async (req, res) => {
    try {
        let books = await bookService.getAllBooks();

        // fetch query params
        const { title, author, minRating, maxRating, sortBy, page = 1, pageSize = 10 } = req.query;

        // Filtering Logic
        if (title) {
            books = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (author) {
            books = books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
        }
        if (minRating) {
            books = books.filter(book => book.rating >= parseFloat(minRating));
        }
        if (maxRating) {
            books = books.filter(book => book.rating <= parseFloat(maxRating));
        }

        // Sorting Logic
        if (sortBy === "title-asc") {
            books.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "title-desc") {
            books.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortBy === "rating-asc") {
            books.sort((a, b) => a.rating - b.rating);
        } else if (sortBy === "rating-desc") {
            books.sort((a, b) => b.rating - a.rating);
        }

        // Pagination Logic
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + parseInt(pageSize);
        const paginatedBooks = books.slice(startIndex, endIndex);

        // Return paginated data and total count
        res.json({
            data: paginatedBooks,
            total: books.length,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
};

// get book detail
const getBookById = async (req, res) => {
    const book = await bookService.getBookById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
};

const addBook = async (req, res) => {
    try {
        const newBook = await bookService.addBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book' });
    }
};

const updateBook = async (req, res) => {
    const updatedBook = await bookService.updateBook(
        parseInt(req.params.id),
        req.body
    );
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.json(updatedBook);
};

const deleteBook = async (req, res) => {
    const success = await bookService.deleteBook(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
