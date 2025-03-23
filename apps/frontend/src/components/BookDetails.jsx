import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import {
  Typography,
  CircularProgress,
  Grid2 as Grid,
  Paper,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(id)
      .then((data) => setBook(data))
      .catch((e) => toast.error('Failed to fetch book details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  if (!book) return <Typography variant='h6'>Book not found.</Typography>;

  return (
    <Grid container spacing={5} sx={{ margin: 'auto', padding: 3 }}>
      <Grid size={12}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {book.title}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Author:
        </Typography>
        <Typography>{book.author}</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Rating:
        </Typography>
        <Typography>{book.rating} / 5</Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Summary:
        </Typography>
        <Typography sx={{ textAlign: 'justify' }}>{book.summary}</Typography>
      </Grid>
      {book.reviews?.length > 0 && (
        <Grid size={12}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
            Reviews:
          </Typography>
          {book.reviews.map((review, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{ padding: 2, marginBottom: 2 }}
            >
              <Typography fontWeight='bold' color='primary'>
                {review.reviewer}
              </Typography>
              <Typography>{review.text}</Typography>
            </Paper>
          ))}
        </Grid>
      )}

      <Grid
        size={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}
      >
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={() => navigate(`/book/${book.id}`)}
          aria-label='edit book'
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}
