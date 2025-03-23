import { useForm, useFieldArray } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function BookForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reviews',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            label='Title'
            fullWidth
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            label='Author'
            fullWidth
            {...register('author', { required: 'Author is required' })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            label='Summary'
            fullWidth
            multiline
            {...register('summary', { required: 'Summary is required' })}
            error={!!errors.summary}
            helperText={errors.summary?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            label='Rating'
            type='number'
            fullWidth
            {...register('rating', {
              required: 'Rating is required',
              min: {
                value: 1,
                message: 'Enter rating between 1-5',
              },
              max: {
                value: 5,
                message: 'Enter rating between 1-5',
              },
            })}
            error={!!errors.rating}
            helperText={errors.rating?.message}
          />
        </Grid>

        {/* Reviews Section */}
        <Grid size={{ xs: 12, md: 10 }}>
          <Typography variant='h6' mt={2}>
            Reviews
          </Typography>
          {fields.map((review, index) => (
            <Box key={review.id} sx={{ display: 'flex', gap: 1, mb: 1, mt: 1 }}>
              <TextField
                label='Reviewer'
                {...register(`reviews.${index}.reviewer`)}
              />
              <TextField
                label='Review'
                fullWidth
                {...register(`reviews.${index}.text`, {
                  required: 'Review text is required',
                })}
                error={!!errors.reviews?.[index]?.text}
                helperText={errors.reviews?.[index]?.text?.message}
              />
              <Button
                variant='contained'
                color='error'
                onClick={() => remove(index)}
              >
                X
              </Button>
            </Box>
          ))}
          <Button
            variant='outlined'
            color='secondary'
            sx={{ mt: 1 }}
            onClick={() => append({ reviewer: '', text: '' })}
            aria-label='add a review'
          >
            + Add Review
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }} sx={{ textAlign: 'right' }}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            size='large'
            aria-label='submit book details'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
