import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SnackbarComponent from './components/snackbar/SnackbarComponent';
import Dashboard from './pages/Dashboard';
import LoginCallback from './pages/LoginCallback';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <SnackbarComponent />
      <Routes>
        <Route path='/login_callback' element={<LoginCallback />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
