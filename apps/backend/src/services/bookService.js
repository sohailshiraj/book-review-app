const fs = require("fs-extra");
const path = require("path");

const dataFile = path.join(__dirname, "../../data/data.json");

// Load books from the JSON file
const loadBooks = async () => {
    try {
        return await fs.readJson(dataFile);
    } catch (error) {
        return []; // Return an empty array if the file doesn't exist or is unreadable
    }
};

// Save books back to the JSON file
const saveBooks = async (books) => {
    try {
        await fs.writeJson(dataFile, books, { spaces: 2 }); // Pretty-print JSON
    } catch (error) {
        throw new Error("Failed to save books");
    }
};

// Get all books
const getAllBooks = async () => {
    return await loadBooks();
};

// Get a single book by ID
const getBookById = async (id) => {
    const books = await loadBooks();
    return books.find((book) => book.id === id) || null;
};

// Add a new book
const addBook = async (newBook) => {
    const books = await loadBooks();

    // Assign a new unique ID (assuming books have incremental IDs)
    newBook.id = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;

    books.push(newBook);
    await saveBooks(books);
    return newBook;
};

// Update an existing book
const updateBook = async (id, updatedData) => {
    const books = await loadBooks();
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) return null; // Book not found

    books[index] = { ...books[index], ...updatedData };
    await saveBooks(books);
    return books[index];
};

// Delete a book by ID
const deleteBook = async (id) => {
    let books = await loadBooks();
    const newBooks = books.filter((book) => book.id !== id);

    if (newBooks.length === books.length) return false; // No book was deleted

    await saveBooks(newBooks);
    return true;
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};