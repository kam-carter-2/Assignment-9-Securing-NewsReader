import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user } = useAuth();

  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('newsreader_saved_articles')
      ) || {};
    } catch {
      return {};
    }
  });

  const username = user?.username;

  const getUserSavedArticles = () => {
    return username ? savedArticlesByUser[username] || [] : [];
  };

  const getAllUserArticles = () => savedArticlesByUser;

  const saveArticle = (article) => {
    if (!username) {
      throw new Error('You must log in to save articles.');
    }

    setSavedArticlesByUser((previous) => {
      const currentArticles = previous[username] || [];

      if (currentArticles.some((item) => item.url === article.url)) {
        return previous;
      }

      const updated = {
        ...previous,
        [username]: [...currentArticles, article],
      };

      localStorage.setItem(
        'newsreader_saved_articles',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const removeArticle = (url) => {
    if (!username) return;

    setSavedArticlesByUser((previous) => {
      const updated = {
        ...previous,
        [username]: (previous[username] || []).filter(
          (article) => article.url !== url
        ),
      };

      localStorage.setItem(
        'newsreader_saved_articles',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const isArticleSaved = (url) => {
    return getUserSavedArticles().some(
      (article) => article.url === url
    );
  };

  return (
    <ArticlesContext.Provider
      value={{
        savedArticlesByUser,
        savedArticles: getUserSavedArticles(),
        getUserSavedArticles,
        getAllUserArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }

  return context;
};
