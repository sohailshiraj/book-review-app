import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookFormPage from './pages/BookFormPage';
import { Container } from '@mui/material';
import BookDetails from './components/BookDetails';

export default function App() {
  return (
    <Router>
      <Container sx={{ paddingTop: '60px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book' element={<BookFormPage />} />
          <Route path='/book/:id' element={<BookFormPage />} />
          <Route path='/book/details/:id' element={<BookDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}
