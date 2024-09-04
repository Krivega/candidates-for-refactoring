// отсутствует типизация
function processUserData<T>(user: T): void {
  // Получаем данные пользователя
  const userData: { age: number } = getUserData(user);

  // Проверяем данные пользователя
  if (userData.age >= 18) {
    // Обрабатываем данные
    processUser(user);
  } else {
    // Выводим ошибку
    console.error('User is under 18');
  }
}
