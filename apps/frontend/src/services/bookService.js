import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

// service - fetch book by filters and pagination
export const fetchBooks = async (filters, sortBy, page, pageSize) => {
    const queryParams = new URLSearchParams(
        Object.entries({
            ...filters,
            sortBy,
            page,
            pageSize,
        }).reduce((acc, [key, value]) => {
            // remove empty query params
            if (value !== '' && value !== undefined && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {})
    ).toString();

    const response = await fetch(`/books?${queryParams}`);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return response.json();
};

// service - fetch book by id
export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

// service - insert book
export const addBook = async (book) => {
    try {
        const response = await axios.post(API_URL, book);
        return response.data;
    } catch (e) {
        throw e;
    }
};

// service - update book record
export const updateBook = async (id, book) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, book);
        return response.data;
    } catch (e) {
        throw e;
    }
};

// service - delete a book record
export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
    } catch (e) {
        throw e;
    }
};
