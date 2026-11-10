import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { getUserSavedArticles } = useArticles();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const activeClass = (path) =>
    `nav-link ${location.pathname === path ? 'active' : ''}`;

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>

          <div className="nav-links">
            <Link to="/" className={activeClass('/')}>Home</Link>

            <Link to="/search" className={activeClass('/search')}>
              Search
            </Link>

            {isAuthenticated && (
              <Link to="/saved" className={activeClass('/saved')}>
                Saved Articles ({getUserSavedArticles().length})
              </Link>
            )}

            {isAuthenticated && isAdmin() && (
              <Link to="/admin" className={activeClass('/admin')}>
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user.username}</span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={activeClass('/login')}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
