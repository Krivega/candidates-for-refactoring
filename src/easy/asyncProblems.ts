// Неправильная обработка промисов + отсутствие обработки ошибок
async function fetchUserData(userId: string) {
  const user = await fetch(`/api/users/${userId}`);
  const userData = await user.json();
  
  const posts = await fetch(`/api/users/${userId}/posts`);
  const postsData = await posts.json();
  
  return {
    user: userData,
    posts: postsData
  };
}

// Смешивание async/await и .then()
async function processData() {
  const data = await getData();
  
  return processUserData(data).then(result => {
    return result.map(item => item.value);
  });
}
