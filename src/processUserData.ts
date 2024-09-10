/**
 * Что было плохо: Отсутствовала обработка исключений.
 * Что стало лучше: Добавлена обработка исключений с помощью try-catch.
Добавление комментариев и документации:
 */

function processUserData(user: User): void {
  try {
    // Получаем данные пользователя
    const userData = getUserData(user);

    // Проверяем данные пользователя
    if (userData.age >= 18) {
      // Обрабатываем данные
      processUser(user);
    } else {
      // Выводим ошибку
      console.error('User is under 18');
    }
  } catch (error) {
    console.error('Error processing user data:', error);
  }
}
