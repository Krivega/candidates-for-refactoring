// 1. HttpStatusCode считаем что определены выше, посколько уже используются,
//    тогда надо привести к виду HttpStatusCode[код]
const hasNotFoundStatus = (response: Response) => {
  return response.status === HttpStatusCode.NOT_FOUND_404;
};

const hasForbiddenStatus = (response: Response) => {
  return response.status === HttpStatusCode.FORBIDDEN_403;
};

const hasServiceUnavailableStatus = (response: Response) => {
  return response.status === HttpStatusCode.STATUS_SERVICE_UNAVAILABLE_503;
};
