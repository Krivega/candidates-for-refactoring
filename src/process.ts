/**
 * Что было плохо: Отсутствовала обработка ошибок.
 * Что стало лучше: Добавлена обработка ошибок с использованием try-catch.
 *
 * Что было плохо: Не было проверки на успешное выполнение операций.
 * Что стало лучше: Добавлены проверки результатов выполнения функций.
 *
 * Что было плохо: Не было ясной логики порядка выполнения функций.
 * Что стало лучше: Обеспечено выполнение функций в правильном порядке с учетом успешного завершения предыдущих шагов.
 */

const processRequests = async () => {
  try {
    const verificationResult = await processVerificationRequest();

    if (!verificationResult.success) {
      throw new Error('Verification failed');
    }

    const updateResult = await makeUpdateRequest();

    if (!updateResult.success) {
      throw new Error('Update request failed');
    }

    const deletionResult = await processDeletion();

    if (!deletionResult.success) {
      throw new Error('Deletion failed');
    }
  } catch (error) {
    console.error('Error processing requests:', error);
  }
};

processRequests();
