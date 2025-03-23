import { useEffect, useState } from 'react';
import { fetchBooks, deleteBook } from '../services/bookService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid2 as Grid,
  TableFooter,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0); // Total number of books
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState('');
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    minRating: '',
    maxRating: '',
  });

  useEffect(() => {
    fetchAllBooks();
  }, [page, rowsPerPage, filters, sortOption]);

  const fetchAllBooks = () => {
    fetchBooks(filters, sortOption, page + 1, rowsPerPage)
      .then((response) => {
        setBooks(response.data);
        setTotal(response.total);
      })
      .catch((error) => {
        toast.error('Failed to fetch books. Please try again later.'); // Error toast
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when changing rows per page
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchAllBooks();
      toast.success('Book deleted successfully!'); // Success toast
    } catch (error) {
      toast.error('Failed to delete book. Please try again.'); // Error toast
    }
  };

  //handles filter change and resetting page
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    setPage(0); // Reset page to 0 when filters change
  };

  //handles sort change and resetting page
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setPage(0); // Reset page to 0 when sorting changes
  };

  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs: 12, md: 2 }}>
        <TextField
          variant='filled'
          label='Title'
          value={filters.title}
          onChange={(e) => handleFilterChange('title', e.target.value)}
          sx={{ marginRight: 1 }}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <TextField
          variant='filled'
          label='Author'
          value={filters.author}
          onChange={(e) => handleFilterChange('author', e.target.value)}
          sx={{ marginRight: 1 }}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6, md: 2 }}>
        <TextField
          variant='filled'
          label='Min Rating'
          type='number'
          value={filters.minRating}
          onChange={(e) => handleFilterChange('minRating', e.target.value)}
          sx={{ marginRight: 1 }}
          fullWidth
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 2 }}>
        <TextField
          variant='filled'
          label='Max Rating'
          type='number'
          value={filters.maxRating}
          onChange={(e) => handleFilterChange('maxRating', e.target.value)}
          sx={{ marginRight: 1 }}
          fullWidth
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}></Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <FormControl fullWidth variant='filled'>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortOption} onChange={handleSortChange}>
            <MenuItem value=''>Default</MenuItem>
            <MenuItem value='rating-desc'>Rating: High to Low</MenuItem>
            <MenuItem value='rating-asc'>Rating: Low to High</MenuItem>
            <MenuItem value='title-asc'>Title: A-Z</MenuItem>
            <MenuItem value='title-desc'>Title: Z-A</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={12}>
        {books.length === 0 ? (
          <Typography variant='h6' align='center' sx={{ my: 4 }}>
            No records found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.rating}</TableCell>
                    <TableCell>
                      <Button
                        color='secondary'
                        onClick={() => navigate(`/book/details/${book.id}`)}
                        aria-label='view book details'
                      >
                        View
                      </Button>
                      <Button
                        color='success'
                        onClick={() => navigate(`/book/${book.id}`)}
                        aria-label='edit book details'
                      >
                        Edit
                      </Button>
                      <Button
                        color='danger'
                        onClick={() => handleDelete(book.id)}
                        aria-label='delete book details'
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={total} // Use total count from the server
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}
