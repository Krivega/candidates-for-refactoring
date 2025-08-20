import React, { useState, useEffect } from 'react';

// Множественные проблемы в React компоненте
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Проблема 1: useEffect без зависимостей, но использует внешние переменные
  useEffect(() => {
    fetchUserData();
  }, []); // Missing dependency: userId
  
  // Проблема 2: Async функция в useEffect без правильной очистки
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userResponse = await fetch(`/api/users/${userId}`);
      const userData = await userResponse.json();
      setUser(userData);
      
      const postsResponse = await fetch(`/api/users/${userId}/posts`);
      const postsData = await postsResponse.json();
      setPosts(postsData);
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };
  
  // Проблема 3: Вычисления в рендере без мемоизации
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const userStats = {
    totalPosts: posts.length,
    avgLikes: posts.reduce((sum, post) => sum + post.likes, 0) / posts.length || 0,
    lastPostDate: posts[0]?.createdAt
  };
  
  // Проблема 4: Inline функции в JSX
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          
          <div>
            <p>Total posts: {userStats.totalPosts}</p>
            <p>Average likes: {userStats.avgLikes.toFixed(1)}</p>
          </div>
          
          <button onClick={() => {
            // Проблема 5: Сложная логика в inline обработчике
            const confirmed = window.confirm('Delete all posts?');
            if (confirmed) {
              posts.forEach(post => {
                fetch(`/api/posts/${post.id}`, { method: 'DELETE' })
                  .then(() => {
                    setPosts(prev => prev.filter(p => p.id !== post.id));
                  });
              });
            }
          }}>
            Delete All Posts
          </button>
          
          <div>
            {sortedPosts.map(post => (
              // Проблема 6: Отсутствие key или неправильный key
              <div key={Math.random()}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <span>Likes: {post.likes}</span>
                
                <button onClick={() => {
                  // Проблема 7: Прямая мутация состояния
                  const updatedPosts = posts;
                  const postIndex = updatedPosts.findIndex(p => p.id === post.id);
                  updatedPosts[postIndex].likes += 1;
                  setPosts(updatedPosts);
                }}>
                  Like
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
