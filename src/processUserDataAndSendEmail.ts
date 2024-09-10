/**
 * Что было плохо: Отсутствовала обработка исключений.
 * Что стало лучше: Добавлена обработка исключений с помощью try-catch.
Добавление комментариев и документации:
 */

function processUserDataAndSendEmail(user: User): void {
  try {
    // Обработка данных пользователя
    user.processData();

    // Отправка электронной почты
    emailService.sendEmail(user.email, 'Данные обработаны успешно');
  } catch (error) {
    console.error('Error processing user data and sending email:', error);
  }
}
