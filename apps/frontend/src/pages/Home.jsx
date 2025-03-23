import { Button, Grid2, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <Typography variant='h3'>Book Review & Recommendation</Typography>
      </Grid2>
      <Grid2 size={12}>
        <Button
          aria-label='go to a new book page'
          onClick={() => navigate('/book')}
          variant='contained'
          color='secondary'
          size='large'
        >
          Add Book
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <BookList />
      </Grid2>
    </Grid2>
  );
}
