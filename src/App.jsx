import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/saved" element={<SavedArticlesPage />} />
              </Route>

              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;
