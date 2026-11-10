import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';

function AdminPage() {
  const { isAdmin } = useAuth();
  const { getAllUserArticles } = useArticles();

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const allUserArticles = getAllUserArticles();

  return (
    <div>
      <h2 className="page-heading">Admin Dashboard</h2>

      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <p style={{ margin: 0, color: '#856404' }}>
          Admin View: You can see all users' saved articles.
        </p>
      </div>

      {Object.keys(allUserArticles).length === 0 ? (
        <div className="message">
          No users have saved any articles yet.
        </div>
      ) : (
        Object.entries(allUserArticles).map(([username, articles]) => (
          <div key={username} style={{ marginBottom: '32px' }}>
            <h3>{username}'s Saved Articles ({articles.length})</h3>

            {articles.length === 0 ? (
              <p>No saved articles.</p>
            ) : (
              <div className="articles-grid">
                {articles.map((article) => (
                  <div key={article.url} className="article-card">
                    <h4>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </h4>
                    <p>{article.section}</p>
                    <p>{article.published_date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;
