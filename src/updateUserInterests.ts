// Каждая функция содержала полный алгоритм обращения к апи
// 1. Разбил на функции с единственной ответственностью и переиспользовал
// 1.1. Код для обращения к АПИ собран в функции someApi
// 1.2. Функции для вызова отдельных апишек оперируют лишь необходимыми переменными
// 1.3. Проверка авторизации вынесена отдельно, и проверяется в самом подходящем,
//        на мой взгляд, месте относительно существовавшего кода
const authTest = () => {
  if (!isLoggedIn()) {
    toLoginPage();

    return;
  }
  return true;
};

const someApi = <T>(url: string, body: T) => {
  if (!authTest()) return;

  const token = getToken();
  const headers = getHeaders(token);

  return fetch(`${domain}/v1/${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      body,
    }),
  });
};

const updateUserHandle = (handle: SomeType1) => {
  return someApi('users/handle', handle);
};

const updateUserInterests = (interestUUIDs: SomeType2) => {
  return someApi('users/interests', interestUUIDs);
};
