/**
 * Что было плохо: Использование магических чисел и различных способов представления HTTP-статусов.
 * Что стало лучше: Использование констант из перечисления HttpStatusCode для всех проверок.
 */

enum HttpStatusCode {
  NOT_FOUND_404 = 404,
  FORBIDDEN_403 = 403,
  SERVICE_UNAVAILABLE_503 = 503,
}

const hasNotFoundStatus = (response: Response): boolean => {
  return response.status === HttpStatusCode.NOT_FOUND_404;
};

const hasForbiddenStatus = (response: Response): boolean => {
  return response.status === HttpStatusCode.FORBIDDEN_403;
};

const hasServiceUnavailableStatus = (response: Response): boolean => {
  return response.status === HttpStatusCode.SERVICE_UNAVAILABLE_503;
};
