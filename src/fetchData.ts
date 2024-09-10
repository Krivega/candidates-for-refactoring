/**
 * Что было плохо: Таймаут пытались реализовать с помощью опции timeout, которая не поддерживается в fetch.
 * Что стало лучше: Реализован таймаут с использованием Promise.race().
 *
 * Что было плохо: Не было проверки статуса ответа.
 * Что стало лучше: Добавлена проверка статуса ответа для обработки возможных HTTP-ошибок.
 */

const DEFAULT_TIMEOUT = 5000;

function fetchData(url: string): Promise<Response> {
  const timeoutPromise = new Promise<Response>((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), DEFAULT_TIMEOUT),
  );

  const fetchPromise = fetch(url);

  return Promise.race([fetchPromise, timeoutPromise])
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
      }
      return response;
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}
