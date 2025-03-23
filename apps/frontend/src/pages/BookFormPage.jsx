import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { getBookById, addBook, updateBook } from '../services/bookService';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export default function BookFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const isEdit = Boolean(id);

  useEffect(() => {
    // fetch book details
    if (isEdit) {
      getBookById(id)
        .then(setBook)
        .catch((error) => {
          toast.error('Failed to fetch book details. Please try again later.'); // Error toast
        });
    }
  }, [id]);

  const onSubmit = async (data) => {
    data.reviews = data.reviews || []; // Ensure reviews exist
    try {
      if (isEdit) {
        delete data.id; // deleting 'id' as passing through url params
        const response = await updateBook(id, data);
      } else {
        const response = await addBook(data);
      }
      toast.success('Success!'); // Success toast
      navigate('/');
    } catch (e) {
      toast.error('Failed to fetch book details. Please try again later.');
    }
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant='h4'>
          {isEdit ? 'Edit Book' : 'Add Book'}
        </Typography>
      </Box>
      {isEdit && !book ? (
        <Typography variant='subtitle2'>Loading...</Typography>
      ) : (
        <BookForm
          onSubmit={onSubmit}
          defaultValues={
            book || {
              title: '',
              author: '',
              summary: '',
              rating: '',
              reviews: [],
            }
          }
        />
      )}
    </Box>
  );
}
