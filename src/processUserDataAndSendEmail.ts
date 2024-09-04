// emailService считаем что определен выше, посколько уже используются
// Необходимо разделить логику обработки данных пользователя и отправки сообщения
function processUserData(user: User) {
  // Обработка данных пользователя
  user.processData();

  // Отправка электронной почты
  sendEmail(user.email, 'Данные обработаны успешно');
}
function sendEmail(email: User['email'], message: string) {
  // Отправка электронной почты
  emailService.sendEmail(email, message);
}
